const invariant = require('invariant');
const jest = require('jest');
const getConfig = require('../utils/getConfig');
const writeBabelConfigJs = require('../utils/writeBabelConfigJs');
const settings = require('../settings');

module.exports = {
    command: 'test',

    desc: 'Run tests with Jest.',

    handler() {
        const config = getConfig();

        invariant(config.options.testMode, 'Make sure to run tests in "test" mode.');

        // Makes the script crash on unhandled rejections instead of silently
        // ignoring them. In the future, promise rejections that are not handled will
        // terminate the Node.js process with a non-zero exit code.
        process.on('unhandledRejection', err => {
            throw err;
        });

        // Make configuration globally available in test environment.
        // This is necessary for the babel-jest transformer to work.
        writeBabelConfigJs(settings.appPath, config.addons.babel);

        // Remove initial items from arguments list and pass the remaining args to Jest.
        // Initial items are: `[node] [confy-core] test`
        const argsList = process.argv.slice(3)
            // Also remove any --env flag that is only confy-core related
            .filter(arg => !arg.includes('--env='));

        argsList.push('--config', JSON.stringify(config.runners.jest));

        jest.run(argsList);
    },
};
