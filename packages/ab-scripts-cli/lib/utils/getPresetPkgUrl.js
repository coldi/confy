const settings = require('../settings');
const resolvePresetName = require('./resolvePresetName');

const getPresetPkgUrl = (preset) => {
    if (settings.presetNameRegEx.test(preset)) {
        return resolvePresetName(preset);
    }

    return preset;
};

module.exports = getPresetPkgUrl;
