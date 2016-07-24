const fs = require('fs');
const ini = require('ini');
const isProduction = process.env.NODE_ENV === 'production';
const configFile = isProduction ? process.env.READER_CONFIG : 'env.cfg';
const config = ini.parse(fs.readFileSync(configFile, 'utf-8'));

exports.getConfig = (section) => config[section];
