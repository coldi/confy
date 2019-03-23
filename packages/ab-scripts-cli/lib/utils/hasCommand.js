const which = require('which');

const hasCommand = (str) => (
    !!which.sync(str, { nothrow: true })
);

module.exports = hasCommand;
