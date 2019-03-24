const spawn = require('cross-spawn-promise');

const initAppPkg = () => {
    console.log('Creating package.json');

    return spawn('npm', ['init', '--yes']);
};

module.exports = initAppPkg;
