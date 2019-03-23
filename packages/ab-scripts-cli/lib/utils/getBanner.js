const chalk = require('chalk');

const getBanner = (v) => chalk.cyan(`
       ____ 
  ___ / ___|
 / _ \\ |
|  __/ |___ 
 \\___|\\____| CLI v${v}
`);

module.exports = getBanner;
