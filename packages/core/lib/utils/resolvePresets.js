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

    const core = `${settings.prefix}core`;
    // Add base scripts as initial configuration.
    const presets = [core]
        .concat((config.presets || []).map(preset => {
            // Return untouched preset name if it contains @ or -
            if (/(@|-)/.test(preset)) return preset;
            // Prefix preset if it contains only 1 word.
            // This is considered confy preset shorthand name.
            return `${settings.prefix}preset-${preset}`;
        }));

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
