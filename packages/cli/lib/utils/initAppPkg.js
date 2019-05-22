const spawn = require('cross-spawn');

const initAppPkg = () => {
    console.log('Creating package.json');

    spawn.sync('npm', ['init', '--yes']);
};

module.exports = initAppPkg;
