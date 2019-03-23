const fs = require('fs');
const path = require('path');

/**
 * Creates a file in the given path.
 * @param {string} extPath
 * @param {string} name
 * @param {Object} content
 */
const writeFile = (extPath, name, content) => {
    const file = path.join(extPath, name);
    const fileContent = JSON.stringify(content, null, 4);

    fs.writeFileSync(file, fileContent);
};

module.exports = writeFile;
