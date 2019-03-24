const spawn = require('cross-spawn-promise');

const initScripts = () => {
    console.log('Run scripts initialization');

    return spawn('npm', ['run', 'init']);
};

module.exports = initScripts;
