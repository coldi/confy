module.exports = {
    options: {
        jsOutputFile: 'node.bundle.js',
        browsersList: ['current node'],
        htmlTemplate: null,
        host: null,
    },
    addons: (options) => ({
        // we define some typescript defaults here,
        // so it can be used with the node preset without further adjustments.
        typescript: {
            compilerOptions: {
                lib: [],
                module: 'commonjs',
                target: 'es2016',
            },
        },
        eslint: {
            settings: {
                'import/resolver': {
                    node: {
                        extensions: options.scriptExtensions.map(ext => `.${ext}`),
                    },
                },
            },
        },
    }),
    runners: () => ({
        webpack: {
            target: 'node',
        },
    }),
};
