module.exports = {
    addons: config => ({
        ...config.addons,

        eslint: {
            extends: prevExtends => [
                ...prevExtends,
                require.resolve('eslint-config-airbnb'),
            ],
            rules: {
                'import/no-unresolved': 'off',
                'import/extensions': 'off',
                'import/no-extraneous-dependencies': 'off',
                'react/jsx-indent': ['warn', 4],
                'react/jsx-indent-props': ['warn', 4],
                'react/prop-types': 'warn',
                'react/prefer-stateless-function': 'warn',
                'react/jsx-filename-extension': 'off',
                'react/sort-comp': 'off',
                'react/no-array-index-key': 'off',
                'react/require-default-props': 'off',
                'jsx-a11y/no-noninteractive-element-interactions': 'off',
                'jsx-a11y/no-static-element-interactions': 'off',
            },
        },

        babel: {
            presets: (presets = []) => [
                ...presets,
                require.resolve('@babel/preset-react'),
            ],
            plugins: (plugins = []) => [
                ...plugins,
                require.resolve('react-hot-loader/babel'),
            ],
        },
    }),

    runners: config => ({
        ...config.runners,

        webpack: {
            '$module.rules[**].use[**][loader=css-loader].options': (
                loaderOptions = {}
            ) => ({
                ...loaderOptions,
                modules: true,
            }),
            '$module.rules': (rules = []) => [
                {
                    test: /\.svg$/,
                    issuer: { test: /\.jsx?$/ },
                    use: ['@svgr/webpack', 'file-loader'],
                },
                ...rules,
            ],
        },

        jest: {
            setupFiles: (files = []) => [
                ...files,
                require.resolve('./config/jest/setupEnv'),
            ],
            moduleNameMapper: {
                '\\.svg': require.resolve('./config/jest/svgrMock'),
            },
        },
    }),
};
