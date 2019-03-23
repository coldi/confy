const resolvePresets = require('./resolvePresets');
const combineConfigs = require('./combineConfigs');

/**
 * Resolves all preset configurations that are used.
 * Then combines these to the final configuration object.
 * @returns {Object}
 */
const getConfig = () => (
    combineConfigs(
        resolvePresets()
    )
);

module.exports = getConfig;
