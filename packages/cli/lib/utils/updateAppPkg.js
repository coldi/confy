const path = require('path');
const fs = require('fs-extra');
const settings = require('../settings');
const getModulePath = require('./getModulePath');

const appPkgPath = path.resolve(settings.appPath, 'package.json');

const updateAppPkg = () => {
    console.log('Updating package.json scripts');

    const pkg = require(appPkgPath);
    const core = `${settings.prefix}core`;
    const corePkg = require(path.join(getModulePath(core), 'resources/package.json'));
    const updatedPkg = Object.assign({}, pkg, corePkg);

    fs.writeFileSync(appPkgPath, JSON.stringify(updatedPkg, null, 2));
};

module.exports = updateAppPkg;
