const path = require('path');
const fs = require('fs-extra');
const settings = require('../settings');
const resolvePresetName = require('./resolvePresetName');
const getModulePath = require('./getModulePath');

const prepareBoilerplate = async (presets = []) => {
    console.log('Preparing project structure');

    const core = `${settings.prefix}core`;
    // Look for boilerplate/ folder in preset package and copy contents to project folder.
    [core, ...presets.map(resolvePresetName)]
        .map(module => path.join(getModulePath(module), 'boilerplate'))
        .filter(boilerplatePath => fs.existsSync(boilerplatePath))
        // These operations need to run sequentially.
        .forEach(boilerplatePath => fs.copySync(boilerplatePath, settings.appPath));

    // Create .gitignore file from template if not existing.
    fs.copySync(
        path.join(getModulePath(core), 'resources/gitignore.tmpl'),
        path.join(settings.appPath, '.gitignore'),
        { overwrite: false }
    );
};

module.exports = prepareBoilerplate;
