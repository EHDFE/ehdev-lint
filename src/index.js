const chalk = require('chalk');

const pkg = require('../package.json');
const linter = require('./linter');

module.exports = {

  command: 'lint',

  description: pkg.description,

  options: [
    [ '-i, --init', '初始化eslint配置'],
  ],

  action(options) {
    linter(options);
  },
};