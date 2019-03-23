/* eslint-disable  no-param-reassign */
const combineConfigs = require('./../lib/utils/combineConfigs');

describe('combineConfigs', () => {
    let result;
    let configA;
    let configB;
    let configC;
    let mockMutationResolver;

    // Define test mock configurations
    beforeEach(() => {
        mockMutationResolver = jest.fn(loader => {
            // eslint-disable-next-line
            loader.options = {
                ...loader.options,
                foo: 'baz',
            };
        });

        configA = {
            options: {
                host: 'root',
                port: 1,
            },
            addons: {
                eslint: {
                    extends: ['foo'],
                    rules: {
                        'some-rule': 'warn',
                        'other-rule': 'off',
                    },
                },
            },
            runners: {
                // This should be called w/ undefined (no prev config)
                webpack: jest.fn(() => ({
                    entry: {
                        main: 'root.js',
                    },
                    module: {
                        rules: [
                            {
                                test: /\.test$/,
                                use: [
                                    {
                                        loader: 'test-loader',
                                        options: {
                                            foo: 'bar',
                                        },
                                    },
                                    {
                                        loader: 'other-loader',
                                        options: {
                                            bar: 'baz',
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                })),
            },
        };

        configB = {
            options: jest.fn(() => ({
                host: 'project',
            })),
            addons: {
                eslint: {
                    // This should not conflict with the '$eslint.extends' query above
                    extends: eslintExtends => [...eslintExtends, 'bar'],

                    // This should overwrite previous eslint.rules (func w/o spread)
                    rules: () => ({
                        'only-rule': 'rules-them-all',
                    }),
                },
            },
            runners: {
                webpack: {
                    // This should get merged with previous webpack.entry (object)
                    entry: {
                        otherBundle: 'other.js',
                    },
                    module: {
                        rules: (rules = []) => {
                            rules.forEach(rule => {
                                if (rule.use) {
                                    rule.use.forEach(useEntry => {
                                        // Find and mutate 'test-loader' entry
                                        if (useEntry.loader === 'test-loader') {
                                            mockMutationResolver(useEntry);
                                        }
                                    });
                                }
                            });

                            return rules;
                        },
                    },
                },
            },
        };

        configC = {
            addons: {
                eslint: {
                    // Mutation should not conflict with 'eslint.extends' from configB
                    extends: eslintExtends => {
                        eslintExtends.push('baz');
                        return eslintExtends;
                    },
                },
            },
            runners: {
                webpack: {
                    module: {
                        rules: (rules = []) => {
                            rules.forEach(rule => {
                                if (rule.use) {
                                    rule.use.forEach(useEntry => {
                                        // Find and mutate 'other-loader' entry
                                        if (useEntry.loader === 'other-loader') {
                                            mockMutationResolver(useEntry);
                                        }
                                    });
                                }
                            });

                            return rules;
                        },
                    },
                },
            },
        };

        result = combineConfigs([configA, configB, configC]);
    });

    test('Function in config A should be called with undefined', () => {
        expect(configA.runners.webpack).toHaveBeenCalledTimes(1);
        expect(configA.runners.webpack).toHaveBeenCalledWith(undefined);
    });

    test('Function in config B should be called with previous config', () => {
        expect(configB.options).toHaveBeenCalledTimes(1);
        expect(configB.options).toHaveBeenCalledWith({
            options: {
                ...configA.options,
            },
        });
    });

    test('Primitive values should be merged correctly', () => {
        expect(result.options.host).toBe('project');
        expect(result.options.port).toBe(1);
    });

    test('Array values should be merged correctly', () => {
        expect(result.addons.eslint.extends.length).toBe(3);
        expect(result.addons.eslint.extends[0]).toBe('foo');
        expect(result.addons.eslint.extends[1]).toBe('bar');
        expect(result.addons.eslint.extends[2]).toBe('baz');
    });

    test('Object values can be overwritten', () => {
        expect(Object.keys(result.addons.eslint.rules)).toHaveLength(1);
        expect(result.addons.eslint.rules['only-rule']).toBeDefined();
    });

    test('Object values can be merged', () => {
        expect(Object.keys(result.runners.webpack.entry)).toHaveLength(2);
        expect(result.runners.webpack.entry.otherBundle).toBeDefined();
    });

    test('Multiple direct mutations should not conflict', () => {
        const testLoaderResult = result.runners.webpack.module.rules[0].use[0];
        const otherLoaderResult = result.runners.webpack.module.rules[0].use[1];

        expect(testLoaderResult.loader).toBe('test-loader');
        expect(testLoaderResult.options.foo).toBe('baz');

        expect(otherLoaderResult.loader).toBe('other-loader');
        expect(otherLoaderResult.options.foo).toBe('baz');
        expect(otherLoaderResult.options.bar).toBe('baz');
    });

    test.skip('Mocked mutating function should receive original value', () => {
        // Call mock fn first
        const webpackA = configA.runners.webpack();

        expect(mockMutationResolver).toHaveBeenCalledTimes(2);
        expect(mockMutationResolver.mock.calls[0][0]).toBe(webpackA.module.rules[0].use[0]);
    });
});
