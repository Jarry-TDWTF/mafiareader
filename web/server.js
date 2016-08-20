import express from 'express';
import * as path from "path";
import * as config from "../config";
import * as model from "../model"

const app = express();
const port = 3000;

model.init(config.getConfig('db')['uri']);

app.use('/static', express.static(path.join(__dirname + '/static')));

app.use('/games/:gameId/posts', (req, res)=> {
  model.getPosts(req.params.gameId).then(posts => {
    res.send(posts);
  });

});

app.use('/games/:gameId/topics', (req, res)=> {
  model.getTopics(req.params.gameId).then(topics => {
    res.send(topics.reduce((a, t) => {
      a[t.tid] = t.title;
      return a
    }, {}));
  });

});

app.use('/games/:gameId/', (req, res)=> {
  const posts = model.getPosts(req.params.gameId);
  const topics = model.getTopics(req.params.gameId).then(topics => {
    return topics.reduce((a, t) => {
      a[t.tid] = t.title;
      return a
    }, {});
  });
  Promise.all([posts, topics]).then(results => {
    res.send({
      posts: results[0],
      topics: results[1]
    });
  });
});

app.use('/games', (req, res)=> {
  return model.getGames().then(games => {
    res.send(games.map(v => ({'id': v.id, 'name': v.name})));
  }).catch((err)=> {
    console.log(err)
  });
});

app.use('/', function (req, res) {
  var options = {
    root: __dirname
  };
  res.sendFile('./index.html', options);
});

app.listen(port, () => {
  console.log("Listening on port: ", port)
});