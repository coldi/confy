const spawn = require('cross-spawn');

const initScripts = () => {
    console.log('Run scripts initialization');

    spawn.sync('npm', ['run', 'init']);
};

module.exports = initScripts;
