const fs = require('fs');
const path = require('path');
const settings = require('../settings');

/**
 * Tests if a config file exists in path, then requires it.
 * If it does not exist, an empty object is returned instead.
 * @param {string} absPath The absolute directory path where the config should be
 */
const requireConfig = absPath => {
    const configFilename = settings.configFilenames.find(
        name => fs.existsSync(path.join(absPath, name))
    );

    return configFilename ? require(path.join(absPath, configFilename)) : {};
};

module.exports = requireConfig;
