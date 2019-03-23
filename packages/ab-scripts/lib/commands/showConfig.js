const util = require('util');
const getConfig = require('../utils/getConfig');

module.exports = {
    command: 'show-config',

    desc: 'Print config to the console.',

    handler () {
        const config = getConfig();

        console.log(util.inspect(config, true, null));
    },
};
