const program = require("commander");
const model = require('./model');
const crawler = require('./crawler');
const config = require('./config');

model.init(config.getConfig('db')['uri']);
crawler.init(config.getConfig('forum'));


program
  .command('add')
  .description('add a mafia game')
  .option("-t, --title [title]", "title of the game")
  .option("-l, --list <items>", 'threads list', list)
  .action(function (options) {
    const title = options.title || "current";
    const threads = options.list || [];

    model.saveGame(title, threads).then(function (res) {
      console.log("game saved with id: %s", res.id);
    });
  })



program.command('list')
  .description("list games in the db")
  .action(function () {
    model.getGames().then((res)=> {
      console.log(res)
    })
  });

program.command('crawl <name>')
  .description('crawl the threads for a mafia game')
  .action(function(name){
    crawler.crawlGame(name).then((res)=>{
      console.log(res)
    })
  });


program.command('pullDocs')
  .description('save the db design docs in disk')
  .action(model.pullDocs);

program.command('pushDocs')
  .description('read the db design docs from disk')
  .action(model.pushDocs);

program.version('0.0.1').parse(process.argv);

function list(val) {
  return val.split(',').map(x => parseInt(x, 10));
}