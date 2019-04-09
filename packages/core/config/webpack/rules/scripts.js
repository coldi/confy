const path = require('path');
const settings = require('../../../lib/settings');

module.exports = (options, addons) => ({
    test: /\.js$/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                ...addons.babel,
                babelrc: false,
            },
        },
        {
            loader: 'eslint-loader',
        },
    ],
    include: [
        path.join(settings.appPath, options.srcDir),
    ],
});
