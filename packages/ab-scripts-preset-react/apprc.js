module.exports = {
    addons: () => ({
        eslint: {
            extends: (prevExtends = []) => [
                ...prevExtends,
                require.resolve('eslint-config-airbnb'),
            ],
            plugins: (plugins = []) => [
                ...plugins,
                'eslint-plugin-react-hooks',
            ],
            rules: {
                'import/no-unresolved': 'off',
                'import/extensions': 'off',
                'react/prop-types': 'warn',
                'react/prefer-stateless-function': 'warn',
                'react/sort-comp': 'off',
                'react/no-array-index-key': 'off',
                'react/require-default-props': 'off',
                'react/jsx-indent': ['warn', 4],
                'react/jsx-indent-props': ['warn', 4],
                'react/jsx-filename-extension': 'off',
                'react/jsx-one-expression-per-line': 'off',
                'react-hooks/rules-of-hooks': 'error',
                'react-hooks/exhaustive-deps': 'warn',
                'jsx-a11y/no-noninteractive-element-interactions': 'off',
                'jsx-a11y/no-static-element-interactions': 'off',
            },
        },

        babel: {
            presets: (presets = []) => [
                ...presets,
                require.resolve('@babel/preset-react'),
            ],
        },
    }),

    runners: config => ({
        webpack: {
            module: {
                rules: (rules = []) => {
                    rules.unshift({
                        test: /\.svg$/,
                        issuer: { test: /\.jsx?$/ },
                        use: ['@svgr/webpack', 'file-loader'],
                    });

                    rules.forEach(rule => {
                        if (!rule.use) return;
                        rule.use.forEach(useEntry => {
                            if (useEntry.loader === 'css-loader') {
                                useEntry.options = {
                                    ...useEntry.options,
                                    modules: true,
                                };
                            }
                        });
                    });

                    return rules;
                },
            },
            resolve: {
                alias: {
                    'react-dom': config.options.devMode
                        ? '@hot-loader/react-dom'
                        : 'react-dom',
                },
            },
        },

        jest: {
            moduleNameMapper: {
                '\\.svg': require.resolve('./config/jest/svgrMock'),
            },
        },
    }),
};
