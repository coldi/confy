const path = require('path');
const invariant = require('invariant');

module.exports = options => {
    invariant(
        typeof options.entryFiles === 'object',
        `Invalid type of 'options.entryFiles'. Please use an Array or Object. Received: ${typeof options.entryFiles}`
    );

    const bundledEntries = [];

    if (options.devMode && options.host) {
        const url = `http://${options.host}:${options.port}`;
        bundledEntries.push(`webpack-dev-server/client?${url}`, 'webpack/hot/dev-server');
    }

    if (Array.isArray(options.entryFiles)) {
        return {
            main: [
                ...bundledEntries,
                // Items in an `entryFiles` Array are prefixed with `srcDir` automatically.
                ...options.entryFiles.map(file => `./${path.join(options.srcDir, file)}`),
            ],
        };
    }

    if (Array.isArray(options.entryFiles.main)) {
        // If `entryFiles` is defined as an Object with a `main` Array...
        return {
            ...options.entryFiles,
            main: [
                // we inject the bundle entries for convenience,
                ...bundledEntries,
                // but we do not prefix user entries.
                ...options.entryFiles.main,
            ],
            // This is considered advanced usage and there will likely be other entry points
            // specified here by the user, that we don't want to modify.
        };
    }

    return options.entryFiles;
};
