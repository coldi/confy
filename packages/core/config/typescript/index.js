module.exports = options => ({
    compilerOptions: {
        outDir: options.buildDir,
    },
    include: [options.srcDir],
});
