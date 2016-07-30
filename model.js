'use strict';
const nano = require('nano');
const fs = require('fs');
let db = undefined;

exports.init = function (dburi) {
  db = nano(dburi);
};

exports.saveGame = function (title, topics) {
  let game = {
    name: title,
    type: 'GAME',
    topics
  };

  return promesifyInsert(title, game);
};

exports.getGames = function (keys) {
  return new Promise((res, rej)=> {
    let params = {};
    if (keys != undefined) {
      params['keys'] = keys
    }

    db.view('games', 'games', function (err, body) {
      if (!err) {
        res(body.rows.map((x)=>x.value))
      }
    });
  })
};

exports.saveTopic = function (topic, pages) {
  const topicDoc = {
    _id: 'tid:' + topic,
    tid: topic,
    type: 'TOPIC',
    pages: pages
  };

  return promesifyInsert(topicDoc._id, topicDoc);
};

exports.savePost = function (post) {
  const id = 'pid:' + post.pid;
  return promesifyInsert(id, post);
};

function promesifyInsert(id, doc) {
  return new Promise((resolve, reject) => {
    db.insert(doc, id, function (err, body) {
      if (err) {
        reject('[db.insert] ', err.message);
        console.log(err.message)
        return;
      }
      resolve(body);
    });
  });
}


exports.pullDocs = function () {
  const params = {
    startkey: "_design/",
    endkey: "_design0",
    include_docs: true
  };

  db.get('_all_docs', params, (err, body) => {
    const docs = body.rows.map((d) => d.doc);
    fs.writeFile("_design_docs.json", JSON.stringify(docs, null, 2));
  })
};

exports.pushDocs = function () {
  fs.readFile('_design_docs.json', (err, data) => {
    if (err) throw err;
    db.bulk({
        new_edits:false,
        docs: JSON.parse(data)
      },
      (err, body) => {
        if (err) console.log(err);
        console.log(body);
      });
  });
};