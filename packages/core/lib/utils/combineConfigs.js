const invariant = require('invariant');
const merge = require('./merge');

/**
 * The sections of a valid configuration object.
 * The order of items does matter when combining.
 * @type {string[]}
 */
const sections = ['options', 'addons', 'runners'];

/**
 * Casts a value to a function wrapper.
 * @param {*} value
 * @returns {Function}
 */
const castFn = (value) => (
    typeof value === 'function' ? value : () => value
);

/**
 * Combines a given list of configuration objects.
 * The first element in the list must be the root configuration.
 * The last element in the list must be the external configuration.
 * In between there can be other (preset) configurations.
 * @param {Array} configs A list of configurations
 * @returns {Object} The resulting combined configuration object
 */
const combineConfigs = (configs) => {
    invariant(
        configs.length >= 2,
        `Expected to receive at least 2 configurations. Received: ${configs.length}`
    );

    invariant(
        sections.every(key => key in configs[0]),
        `Expected root config to contain the following sections: ${sections.join(', ')}`
    );

    /**
     * The following block returns the final configuration
     * by merging all passed configs, section by section.
     * The sections are merged in the same order as defined in
     * `sections` above.
     * Every section also receives the current state of the
     * merged config.
     * Therefore addons can use options, and runners can
     * use both options and addons.
     */
    return sections.reduce((mergedConfig, sectionKey) => ({
        ...mergedConfig,
        [sectionKey]: configs.reduce((mergedSection, config) => (
            merge(
                mergedSection,
                // Normalize each config section by casting it to a function.
                castFn(config[sectionKey])({
                    ...mergedConfig,
                    [sectionKey]: {
                        ...mergedSection,
                    },
                })
            )
        ), {}),
    }), {});
};

module.exports = combineConfigs;
