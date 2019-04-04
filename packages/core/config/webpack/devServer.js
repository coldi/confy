const path = require('path');
const settings = require('../../lib/settings');

module.exports = (options) => ({
    contentBase: path.resolve(settings.appPath, options.buildDir),
    hot: true,
    inline: true,
    stats: require('./stats')(options),
    historyApiFallback: true,
});
