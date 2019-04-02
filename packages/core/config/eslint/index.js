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
        'import/extensions': ['.js', '.jsx'],
    },
    rules: {
        indent: ['warn', options.tabWidth, { SwitchCase: 1 }],
        quotes: ['error', 'single'],
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                exports: 'always-multiline',
                functions: 'ignore',
            },
        ],
        'no-console': 'warn',
        'padded-blocks': 'off',
        'space-before-function-paren': 'off',
        'function-paren-newline': 'off',
        'arrow-parens': 'off',
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
        'import/no-extraneous-dependencies': 'off',
    },
});
