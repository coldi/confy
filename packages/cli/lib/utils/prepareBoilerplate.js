const path = require('path');
const fs = require('fs-extra');
const settings = require('../settings');
const resolvePresetName = require('./resolvePresetName');
const getModulePath = require('./getModulePath');

const prepareBoilerplate = async (presets = []) => {
    console.log('Preparing project structure');

    const core = `${settings.prefix}core`;
    // Look for boilerplate/ folder in preset package and copy contents to project folder.
    await [core, ...presets.map(resolvePresetName)]
        .map(module => path.join(getModulePath(module), 'boilerplate'))
        .filter(boilerplatePath => fs.existsSync(boilerplatePath))
        // These operations need to run sequentially.
        .reduce(
            (current, boilerplatePath) => (
                current.then(() => fs.copy(boilerplatePath, settings.appPath))
            ),
            Promise.resolve()
        );

    // Create .gitignore file from template if not existing.
    await fs.copy(
        path.join(getModulePath(core), 'resources/gitignore.tmpl'),
        path.join(settings.appPath, '.gitignore'),
        { overwrite: false }
    );

    return Promise.resolve();
};

module.exports = prepareBoilerplate;
