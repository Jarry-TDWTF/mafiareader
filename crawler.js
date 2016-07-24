'use strict';
const model = require('./model');
const r = require('request');
const RateLimiter = require('limiter').RateLimiter;

let config = {
  'url': 'https://what.thedailywtf.com/api/topic/',
  'user-agent': 'wtdwtf'
};
let request;
let limiter;


exports.init = function (conf) {
  config = Object.assign(config, conf);
  request = r.defaults({
    headers: {
      'User-Agent': config.useragent
    },
    json: true
  });
  limiter = new RateLimiter(1, 5000);
};

exports.crawlGame = function (game) {
  return model.getGames([game]).then(res => {
    console.log('crawling ', res[0].name)
    return crawlTopics(game, res[0].topics);
  });
};

function crawlTopics(game, topics) {
  for (let prom of topics.map((t) => crawlTopic(game, t))) {
    prom.then(saveTopicPosts)
  }
}

function crawlTopic(game, topic) {
  console.log('crawling topic: ', topic);
  return requestPage(topic, 1).then((body)=> {
    console.log(typeof body);
    const pages = body.pagination.pageCount;
    console.log('topic has ', pages, 'pages');
    model.saveTopic(topic, pages);
    let proms = [Promise.resolve(body)].concat(range(2, pages + 1).map((i)=> {
        return requestPage(topic, i);
      }));

    return Promise.all(proms.map((p)=> {
      return p.then(parseTopicPage);
    }));
  });
}

function requestPage(topic, page) {
  return new Promise((res, rej)=> {
    limiter.removeTokens(1, function () {
      const topicUrl = getTopicUrl(topic, page);
      console.log('Crawling page: ',topicUrl);
      request(topicUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          res(body);
        }
        rej(error);
      });
    });
  });
}

function parseTopicPage(body) {
  return Promise.all(body.posts.map(
    p => model.savePost(p)
  ));
}

function getTopicUrl(topicId, page) {
  return config.url + 'topic/' + topicId + '?page=' + page;
}

function range(start, edge, step) {
  // If only one number was passed in make it the edge and 0 the start.
  if (arguments.length == 1) {
    edge = start;
    start = 0;
  }

  // Validate the edge and step numbers.
  edge = edge || 0;
  step = step || 1;

  // Create the array of numbers, stopping before the edge.
  for (var ret = []; (edge - start) * step > 0; start += step) {
    ret.push(start);
  }
  return ret;
}