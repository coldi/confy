const fs = require('fs');
const path = require('path');

const template = `/* eslint-disable */
module.exports = function(api) {
    api.cache(() => process.env.NODE_ENV);

    return $CONTENT$;
}

`;

/**
 * Creates a babel.config.js file with the given content.
 * @param {string} extPath
 * @param {Object} content
 */
const writeBabelConfigJs = (extPath, content) => {
    const file = path.join(extPath, 'babel.config.js');
    const jsonContent = JSON.stringify(content, null, 4);

    fs.writeFileSync(file, template.replace('$CONTENT$', jsonContent));
};

module.exports = writeBabelConfigJs;
