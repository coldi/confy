/* eslint-disable  no-undef */
const fs = require('fs');
const del = require('del');
const path = require('path');
const webpack = require('webpack');
const requireConfig = require('../lib/utils/requireConfig');
const combineConfigs = require('../lib/utils/combineConfigs');
const settings = require('../lib/settings');

process.chdir(path.join(__dirname, '../'));

const makeBundle = (config) => {
    const bundle = webpack(config.runners.webpack);

    return new Promise((resolve, reject) => {
        bundle.run((err, stats) => {
            if (err) {
                reject(err);
            } else if (stats.compilation.errors.length) {
                reject(Error(stats.toString('errors-only')));
            } else {
                resolve(stats);
            }
        });
    });
};

describe('Webpack', () => {
    // 60 sec time to create bundle
    jest.setTimeout(60000);

    const buildDir = 'test/build';
    const testConfig = {
        options: {
            srcDir: 'test/mock/src',
            buildDir,
            // Set production mode
            devMode: false,
            testMode: false,
        },
    };

    beforeEach(() => {
        del([path.resolve(buildDir)]);
    });

    test('Bundle files are created without errors or warnings', () => {
        const rootConfig = requireConfig(settings.rootPath);
        const config = combineConfigs([rootConfig, testConfig]);

        return makeBundle(config).then((stats) => {
            const minStats = stats.toJson('minimal');

            expect(minStats.errors).toHaveLength(0);
            expect(minStats.warnings).toHaveLength(0);

            [
                'index.html',
                'main.bundle.js',
                'main.bundle.js.map',
                'style.css',
                'style.css.map',
                'assets/foo.bar',
            ]
                .forEach(file => expect(fs.existsSync(path.join(buildDir, file))).toBe(true));
        });
    });
});
