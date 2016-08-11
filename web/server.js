import express from 'express';
import * as path from "path";
import * as config from "../config";
import * as model from "../model"

const app = express();
const port = 3000;

model.init(config.getConfig('db')['uri']);

app.use('/static', express.static(path.join(__dirname + '/static')));

app.use('/games', (req, res)=>{
  return model.getGames().then( games => {
    res.send(games.map(v => ({'id':v.id, 'name': v.name})));
  }).catch((err)=>{ console.log(err)});
});

app.use('/games/:gameId/posts', (req, res)=>{

});

app.use('/', function(req, res){
  var options = {
    root: __dirname
  };
  res.sendFile('./index.html',options);
});

app.listen(port, () => {
  console.log("Listening on port: ", port)
});