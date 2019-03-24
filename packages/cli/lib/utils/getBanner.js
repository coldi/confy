/* eslint-disable no-useless-escape */
const chalk = require('chalk');

const getBanner = (v) => chalk.cyan(`
                  __
  ___ ___  _ __  / _|_   _
 / __/ _ \\| '_ \\| |_| | | |
| (_| (_) | | | |  _| |_| |
 \\___\\___/|_| |_|_|  \\__, |  CLI v${v}
                     |___/
`);

module.exports = getBanner;
