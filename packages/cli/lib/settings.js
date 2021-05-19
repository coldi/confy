const appPath = process.cwd();
// Check if preset contains only characters, numbers and -
const presetNameRegEx = /^[a-z0-9-]+$/i;
const prefix = '@confy/';
const presetNamePrefix = `${prefix}preset-`;
// Workaround to avoid installing latest 1.0.0-beta* releases
const presetVersionSuffix = '@^0.x.x';

module.exports = {
    appPath,
    prefix,
    presetNameRegEx,
    presetNamePrefix,
    presetVersionSuffix,
};
