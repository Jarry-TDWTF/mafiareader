import express from 'express'
import * as path from "path";

const app = express();
const port = 3000;

app.use('/static', express.static(path.join(__dirname + '/static')));

app.use('/customers', (req, res)=>{
  return res.send([
    {id:1, name:'asd'},
    {id:2, name:'dsa'}
    ]);
})

app.use('/', function(req, res){
  var options = {
    root: __dirname
  };
  res.sendFile('./index.html',options);
});

app.listen(port);