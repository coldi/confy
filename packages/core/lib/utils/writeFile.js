const fs = require('fs');
const path = require('path');

/**
 * Creates a file in the given path.
 * @param {string} extPath
 * @param {string} name
 * @param {string|Object} content
 */
const writeFile = (extPath, name, content) => {
    const file = path.join(extPath, name);
    const fileContent = typeof content === 'object'
        ? JSON.stringify(content, null, 4)
        : content;

    fs.writeFileSync(file, fileContent);
};

module.exports = writeFile;
