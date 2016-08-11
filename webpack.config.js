var webpack = require('webpack');
var path = require('path');

var rewriteUrl = function (replacePath) {
  return function (req, opt) {  // gets called with request and proxy object
    var queryIndex = req.url.indexOf('?');
    var query = queryIndex >= 0 ? req.url.substr(queryIndex) : '';
    req.url = req.path.replace(opt.path, replacePath) + query;
  };
};

var config = {
  entry: {
    app: './web/client/client'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve('web/static'),
    publicPath: '/'
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(png|svg)$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: 'file-loader' }
    ]
  },
  devServer: {
  }
};

module.exports = config;