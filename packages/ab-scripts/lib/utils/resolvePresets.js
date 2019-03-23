const path = require('path');
const requireConfig = require('./requireConfig');
const settings = require('../settings');

/**
 * Resolves the configurations including presets and the base scripts package.
 * @param [appPath=settings.appPath] An optional path to the app root.
 * @returns {Object[]} The configuration objects of base scripts, presets and app.
 */
const resolvePresets = (appPath = settings.appPath) => {
    const config = requireConfig(appPath);

    const baseScripts = `${settings.prefix}scripts`;
    // Add base scripts as initial configuration.
    const presets = [baseScripts]
        // Prefix other presets.
        .concat((config.presets || []).map(preset => `${baseScripts}-preset-${preset}`));

    return presets
        .map(preset => {
            // require.resolve refers to the `main` entry in package.json by default.
            // Therefore we require the package.json itself.
            let presetConfigPath = require.resolve(`${preset}/package.json`, { paths: [appPath] });
            // Then fall back to the package root directory.
            presetConfigPath = path.dirname(presetConfigPath);
            return requireConfig(presetConfigPath);
        })
        .concat([config]);
};

module.exports = resolvePresets;
