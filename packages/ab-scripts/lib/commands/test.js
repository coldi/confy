const invariant = require('invariant');
const jest = require('jest');
const getConfig = require('../utils/getConfig');
const writeFile = require('../utils/writeFile');
const settings = require('../settings');

module.exports = {
    command: 'test',

    desc: 'Run tests with jest.',

    handler () {
        const config = getConfig();

        invariant(
            config.options.testMode,
            'Make sure to run tests in "test" mode.'
        );

        // Makes the script crash on unhandled rejections instead of silently
        // ignoring them. In the future, promise rejections that are not handled will
        // terminate the Node.js process with a non-zero exit code.
        process.on('unhandledRejection', (err) => {
            throw err;
        });

        // Make configuration globally available in test environment.
        // This is necessary for the babel-jest transformer to work.
        writeFile(settings.appPath, '.babelrc', config.addons.babel);

        // TODO: check later if this workaround is still needed
        const argsList = process.argv
            .slice(2)
            .filter(arg => arg !== 'test');

        argsList.push('--config', JSON.stringify(config.runners.jest));

        jest.run(argsList);
    },
};
