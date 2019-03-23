const settings = require('../../lib/settings');

module.exports = () => ({
    verbose: true,
    rootDir: settings.appPath,
    testEnvironment: 'jsdom',
    // fix possible issue with jsdom localStorage.
    // see: https://github.com/facebook/jest/issues/6766
    testURL: 'http://localhost',
    setupFiles: [
        require.resolve('./setupEnv'),
    ],
    moduleNameMapper: {
        '\\.css$': require.resolve('identity-obj-proxy'),
        // Example for internal path alias (e.g. assets/foo -> src/assets/foo)
        // '^assets(.*)$': `<rootDir>${path.join(options.srcDir, 'assets')}$1`,
    },
    transform: {
        '\\.js$': require.resolve('babel-jest'),
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': require.resolve('./fileTransform'),
    },
});
