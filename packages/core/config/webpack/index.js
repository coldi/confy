const settings = require('../../lib/settings');

module.exports = (config) => ({
    entry: require('./entry')(config.options),

    output: require('./output')(config.options),

    target: 'web',

    mode: config.options.devMode
        ? 'development'
        : 'production',

    devtool: config.options.devMode
        ? 'cheap-module-eval-source-map'
        : 'none',

    devServer: require('./devServer')(config.options),

    stats: require('./stats')(config.options),

    module: {
        rules: [
            require('./rules/scripts')(config.options, config.addons),
            require('./rules/styles')(config.options),
            require('./rules/files')(config.options),
        ],
    },

    plugins: require('./plugins')(config.options),

    resolve: {
        modules: [
            'node_modules',
            settings.nodeModulesPath,
            settings.appNodeModulesPath,
        ],
        extensions: [
            '.mjs',
            '.js',
            '.json',
        ],
    },

    resolveLoader: {
        modules: [
            'node_modules',
            settings.nodeModulesPath,
            settings.appNodeModulesPath,
        ],
    },
});
