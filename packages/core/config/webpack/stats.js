module.exports = (options) => ({
    preset: 'minimal',
    entrypoints: !options.devMode,
    assets: false,
    modules: false,
    runtimeModules: false,
    moduleTrace: true,
});
