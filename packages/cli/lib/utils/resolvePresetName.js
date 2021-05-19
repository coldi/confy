const { URL } = require('url');
const path = require('path');
const settings = require('../settings');

const resolvePresetName = (preset) => {
    // Try to resolve preset as git url
    try {
        const presetUrl = new URL(preset);
        return path.basename(presetUrl.pathname, '.git');
    } catch (err) {
        // It's fine, proceed...
    }

    // Test if simple preset name was passed
    if (settings.presetNameRegEx.test(preset)) {
        // Add preset prefix
        return `${settings.presetNamePrefix}${preset}`;
    }

    return preset;
};

module.exports = resolvePresetName;
