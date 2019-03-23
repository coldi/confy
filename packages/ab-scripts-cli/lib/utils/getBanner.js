const chalk = require('chalk');

const getBanner = (v) => chalk.cyan(`
App Build Scripts CLI v${v}
`);

module.exports = getBanner;
