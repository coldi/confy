const chalk = require('chalk');
const spawn = require('cross-spawn-promise');
const settings = require('../settings');
const getPresetPkgUrl = require('./getPresetPkgUrl');

const switchInstallArgs = pkgManager => {
    switch (pkgManager) {
        case 'npm':
            return ['install', '--save-dev'];
        case 'yarn':
            return ['add', '--dev'];
        default:
            return [];
    }
};

const installDeps = (presets = [], pkgManager) => {
    const args = switchInstallArgs(pkgManager);

    console.log('Installing dependencies.', chalk.gray('Hang on ...'));

    const core = `${settings.prefix}core`;
    const deps = [core].concat(presets.map(getPresetPkgUrl));

    return spawn(pkgManager, [...args, ...deps]);
};

module.exports = installDeps;
