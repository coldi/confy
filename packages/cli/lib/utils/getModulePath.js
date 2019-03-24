const path = require('path');
const settings = require('../settings');

const getModulePath = (pkgName) => (
    // require.resolve refers to the `main` entry in package.json be default.
    // Therefore we require the package.json itself and then use dirname.
    path.dirname(
        require.resolve(`${pkgName}/package.json`, { paths: [settings.appPath] })
    )
);

module.exports = getModulePath;
