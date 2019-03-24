const path = require('path');

module.exports = (options) => ({
    path: path.resolve(options.buildDir),
    publicPath: './',
    filename: options.jsOutputFile,
});
