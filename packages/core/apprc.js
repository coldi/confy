module.exports = {
    options: () => ({
        // Working and output directories
        srcDir: 'src',
        assetsDir: 'assets', // relative to srcDir
        buildDir: 'build',
        // Define files for main bundle
        entryFiles: ['index'],
        // Set js output filename
        jsOutputFile: '[name].bundle.js',
        // Set css output filename
        cssOutputFile: 'style.css',
        // Set css filename for dynamic chunks
        cssChunkFile: '[id].css',
        // Set default html template (or `null` for no html template)
        htmlTemplate: 'index.html',
        // Define page title
        title: 'New App',
        // Code style indention
        tabWidth: 4,
        // DevServer settings
        host: '0.0.0.0',
        port: 3000,
        // List of supported browsers for babel-preset-env and autoprefixer.
        browsersList: [
            '>2.5%',
            'last 4 chrome versions',
            'last 4 ff versions',
            'last 2 edge versions',
            'last 2 ios versions',
            'last 2 safari versions',
            'not ie 11',
        ],
        // The file size in bytes under which the url-loader kicks in.
        inlineFileSize: -1, // Disabled
        // Define environment boolean flags
        devMode: process.env.NODE_ENV === 'development',
        testMode: process.env.NODE_ENV === 'test',
    }),

    addons: config => ({
        babel: require('./config/babel')(config.options),
        eslint: require('./config/eslint')(config.options),
        prettier: require('./config/prettier')(config.options),
        typescript: require('./config/typescript')(config.options),
    }),

    runners: config => ({
        webpack: require('./config/webpack')(config),
        jest: require('./config/jest')(config),
    }),
};
