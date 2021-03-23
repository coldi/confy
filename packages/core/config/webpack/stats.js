module.exports = (options) => ({
    assets: !options.devMode,
    timings: true,
    hash: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: false,
});
