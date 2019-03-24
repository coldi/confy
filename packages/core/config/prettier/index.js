module.exports = (options) => ({
    parser: 'babel',
    arrowParens: 'avoid',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    jsxSingleQuote: false,
    semi: true,
    singleQuote: true,
    tabWidth: options.tabWidth,
    trailingComma: 'es5',
    useTabs: false,
    printWidth: 90,
});
