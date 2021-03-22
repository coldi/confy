module.exports = (options) => ({
    extends: [
        'eslint-config-airbnb-base',
        'plugin:prettier/recommended',
    ],
    parser: 'babel-eslint',
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    settings: {
        'import/extensions': options.scriptExtensions.map(ext => `.${ext}`),
    },
    rules: {
        'no-console': 'warn',
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
        'import/no-extraneous-dependencies': 'off',
    },
});
