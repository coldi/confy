const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

function putPrettierLast(entries) {
    const prettier = entries.filter(a => /prettier/i.test(a));
    const others = entries.filter(a => !/prettier/i.test(a));
    return others.concat(prettier);
}

module.exports = {
    options: {
        scriptExtensions: (extensions = []) => [...extensions, 'jsx'],
    },
    addons: config => ({
        eslint: {
            extends: (prevExtends = []) =>
                putPrettierLast([...prevExtends, 'eslint-config-airbnb']),
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
                'react/require-default-props': 'off',
                'react/jsx-indent': ['warn', config.options.tabWidth],
                'react/jsx-indent-props': ['warn', config.options.tabWidth],
                'react/jsx-filename-extension': 'off',
                'react/jsx-one-expression-per-line': 'off',
                'react-hooks/rules-of-hooks': 'error',
                'react-hooks/exhaustive-deps': 'warn',
            },
        },

        babel: {
            presets: (presets = []) => {
                presets.push(require.resolve('@babel/preset-react'));
                return presets;
            },
            plugins: (plugins = []) => {
                if (config.options.devMode) {
                    plugins.push(require.resolve('react-refresh/babel'));
                }
                return plugins;
            },
        },

        typescript: {
            compilerOptions: {
                jsx: 'react',
            },
        },
    }),

    runners: config => ({
        webpack: {
            plugins: (plugins = []) => {
                if (config.options.devMode) {
                    plugins.push(new ReactRefreshWebpackPlugin());
                }
                return plugins;
            },
            module: {
                rules: (rules = []) => {
                    rules.unshift({
                        test: /\.svg$/,
                        issuer: /\.jsx?$/,
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
        },

        jest: {
            moduleNameMapper: {
                '\\.svg': require.resolve('./config/jest/svgrMock'),
            },
        },
    }),
};
