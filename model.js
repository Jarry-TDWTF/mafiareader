'use strict'
const db = require('nano')('http://localhost:5984/reader');

exports.addGame = function(title, threads) {
  return new Promise((resolve, reject) =>{
    let game = {
      name: title,
      type: 'GAME',
      threads
    };
    db.insert(game, 'game-'+title, function(err, body) {
      if (err) {
        reject('[db.insert] ', err.message);
        console.log(err.message)
        return;
      }
      resolve(body);
    });
  });
}

exports.getGames = function () {
  return new Promise((res,rej)=>{
    db.view('games', 'games', function(err, body) {
      if (!err) {
        body.rows.forEach(function(doc) {
          res(doc.value)
        });
      }
    });
  })
}