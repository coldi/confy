const invariant = require('invariant');
const chalk = require('chalk');
const webpack = require('webpack');
const getConfig = require('../utils/getConfig');

module.exports = ({
    command: 'build',

    desc: 'Build and bundle all the things for production.',

    handler (argv) {
        const config = getConfig();

        invariant(
            !config.options.devMode && !config.options.testMode,
            'Make sure to run build script in "production" mode.'
        );


        if (argv.watch) {
            // Add flag for watch mode.
            config.runners.webpack.watch = true;
        }

        const compiler = webpack(config.runners.webpack);

        const callback = (err, stats) => {
            console.log();

            if (err || stats.hasErrors()) {
                console.log(chalk.red('Build failed!'));
                console.log();
                console.log('[webpack]', stats.toString(config.runners.webpack.stats));
                process.exit(1);
            }

            console.log(chalk.green('Compiled successfully!'));
            console.log();
            console.log('[webpack]', stats.toString(config.runners.webpack.stats));
        };

        if (config.runners.webpack.watch) {
            compiler.watch(config.runners.webpack.watchOptions, callback);
        } else {
            compiler.run(callback);
        }
    },
});
