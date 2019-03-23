const path = require('path');

module.exports = {
    options: {
        stylesDir: 'styles', // relative to srcDir
    },
    runners: config => ({
        ...config.runners,

        webpack: {
            module: {
                rules: (rules = []) => {
                    const cssRule = rules.find(
                        rule =>
                            '.css'.match(rule.test) && !'.scss'.match(rule.test)
                    );

                    if (!cssRule) {
                        console.warn(
                            'Sass preset could not find a base webpack rule that handles .css files.'
                        );
                        return rules;
                    }

                    const sassRule = {
                        ...cssRule,
                        test: /\.scss$/,
                        use: [
                            ...cssRule.use,
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true,
                                    includePaths: [
                                        path.resolve(
                                            config.options.srcDir,
                                            config.options.stylesDir
                                        ),
                                    ],
                                },
                            },
                        ],
                    };

                    return [...rules, sassRule];
                },
            },
        },

        jest: {
            moduleNameMapper: {
                '\\.scss$': require.resolve('identity-obj-proxy'),
            },
        },
    }),
};
