const program = require("commander");
const model = require('./model');

function list(val) {
  return val.split(',').map(x => parseInt(x, 10));
}

program
  .command('add')
  .description('add a mafia game')
  .option("-t, --title [title]", "title of the game")
  .option("-l, --list <items>", 'threads list', list)
  .action(function (options) {
    const title = options.title || "current";
    const threads = options.list || [];

    model.addGame(title, threads).then(function (res) {
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

program.version('0.0.1').parse(process.argv);