'use strict';
const nano = require('nano');
const fs = require('fs');
let db = undefined;

function promesifyInsert(doc, id, newEdits) {
  const new_edits = typeof newEdits !== "undefined" ? newEdits : true;

  return new Promise((resolve, reject) => {

    db.insert(doc, {_id: id, new_edits: new_edits}, function (err, body) {
      if (err) {
        reject('[db.insert] ', err.message);
        console.log(err.message);
        return;
      }
      resolve(body);
    });
  }).catch(err => {
    console.log(err)
  });
}

exports.init = function (dburi) {
  db = nano(dburi);
};

exports.saveGame = function (title, topics) {
  let game = {
    _id: 'g:' + title,
    name: title,
    type: 'GAME',
    topics
  };

  return promesifyInsert(game, game._id);
};

exports.getGames = function (keys) {
  return new Promise((res, rej)=> {
    let params = {};
    if (keys != undefined) {
      params['keys'] = keys.map(k => 'g:' + k)
    }

    db.view('games', 'games', function (err, body) {
      if (!err) {
        res(body.rows.map((x)=>x.value))
      }
      else {
        rej(err);
      }
    });
  })
};


exports.saveTopic = function (topic, title, pages, gid) {
  const topicDoc = {
    _id: 'tid:' + topic,
    tid: topic,
    title: title,
    type: 'TOPIC',
    pages: pages,
    gid: gid
  };

  return promesifyInsert(topicDoc, topicDoc._id);
};

exports.savePost = function (post, gameId) {
  post._id = 'pid:' + post.pid;
  post.type = 'POST';
  post.game = gameId;
  return promesifyInsert(post, post._id);
};

exports.getPosts = function (gameId) {
  return new Promise((res, rej)=> {
    let params = {
      startkey: [gameId],
      endkey: [gameId, {}]
    };
    db.view('games', 'posts', params, function (err, body) {
      if (!err) {
        res(body.rows.map((x)=>x.value));
      }
      else {
        rej(err);
      }
    });
  });
};

exports.getTopics = function (gameId) {
  return new Promise((res, rej)=> {
    let params = {
      keys:[gameId]
    };
    db.view('games', 'threads', params, function (err, body) {
      if (!err) {
        res(body.rows.map((x)=>x.value));
      }
      else {
        rej(err);
      }
    });
  });
};

exports.pullDocs = function () {
  const params = {
    startkey: "_design/",
    endkey: "_design0",
    include_docs: true
  };

  db.get('_all_docs', params, (err, body) => {
    const docs = body.rows;
    fs.writeFile("_design_docs.json", JSON.stringify(docs, null, 2));
  })
};

exports.pushDocs = function () {
  fs.readFile('_design_docs.json', (err, data) => {
    if (err) throw err;

    const proms = JSON.parse(data).map((v)=> {
      return promesifyInsert(v.doc, v.doc._id, false)
    });

    Promise.all(proms).then((vals)=> {
      console.log(`Saved ${vals.length} design docs`);
    });
  });
};