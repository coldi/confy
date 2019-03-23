const invariant = require('invariant');
const chalk = require('chalk');
const ip = require('ip');
const clearConsole = require('console-clear');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const getConfig = require('../utils/getConfig');

module.exports = {
    command: 'start',

    desc: 'Start the webpack development server.',

    handler () {
        const config = getConfig();

        invariant(
            config.options.devMode && !config.options.testMode,
            'Make sure to start dev server in "development" mode.'
        );

        const { host, port } = config.options;
        const localUrl = `http://${host === '0.0.0.0' ? 'localhost' : host}:${port}`;
        const networkUrl = `http://${ip.address()}:${port}`;

        const compiler = webpack(config.runners.webpack);

        compiler.plugin('done', (stats) => {
            clearConsole();

            if (stats.hasErrors()) {
                console.log(chalk.red('Build failed!'));
            } else {
                console.log(chalk.green('Compiled successfully!'));
                console.log();
                console.log('Open your browser to view the app.');
                console.log();
                console.log(`Local:            ${localUrl}`);
                console.log(`On Your Network:  ${networkUrl}`);
            }

            console.log();
        });

        new WebpackDevServer(
            compiler,
            config.runners.webpack.devServer
        ).listen(port, host);
    },
};
