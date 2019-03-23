const path = require('path');
const fs = require('fs-extra');
const settings = require('../settings');
const getModulePath = require('./getModulePath');

const appPkgPath = path.resolve(settings.appPath, 'package.json');

const updateAppPkg = () => {
    console.log('Updating package.json scripts');

    const pkg = require(appPkgPath);
    const baseScripts = `${settings.prefix}scripts`;
    const scriptsPkg = require(path.join(getModulePath(baseScripts), 'resources/package.json'));
    const updatedPkg = Object.assign({}, pkg, scriptsPkg);

    return fs.writeFile(appPkgPath, JSON.stringify(updatedPkg, null, 2));
};

module.exports = updateAppPkg;
