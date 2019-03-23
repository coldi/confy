/* eslint-disable  no-undef */
const combineConfigs = require('./../lib/utils/combineConfigs');

describe('combineConfigs', () => {
    let result;
    let configA;
    let configB;
    let configC;
    let mockJsonQueryResolver;

    // Define test mock configurations
    beforeEach(() => {
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
                // This should merge entries of eslint.extends (func w/ spread)
                '$eslint.extends': (eslintExtends) => ([
                    ...eslintExtends,
                    'bar',
                ]),

                eslint: {
                    // This should not conflict with the '$eslint.extends' query above
                    extends: (eslintExtends) => ([
                        ...eslintExtends,
                        'baz',
                    ]),

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
                },
            },
        };

        mockJsonQueryResolver = jest.fn((loader) => ({
            ...loader,
            options: {
                ...loader.options,
                foo: 'baz',
            },
        }));

        configC = {
            runners: {
                webpack: {
                    '$module.rules[**].use[**][loader=test-loader]': mockJsonQueryResolver,
                    // Multiple search queries should not conflict
                    '$module.rules[**].use[**][loader=other-loader]': mockJsonQueryResolver,
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
        expect(result.addons.eslint.extends.length).toBeGreaterThan(1);
        expect(result.addons.eslint.extends).toContain('bar');
    });

    test('Object values can be overwritten', () => {
        expect(Object.keys(result.addons.eslint.rules)).toHaveLength(1);
        expect(result.addons.eslint.rules['only-rule']).toBeDefined();
    });

    test('Object values can be merged', () => {
        expect(Object.keys(result.runners.webpack.entry)).toHaveLength(2);
        expect(result.runners.webpack.entry.otherBundle).toBeDefined();
    });

    test('Query function should be merged correctly', () => {
        const testLoaderResult = result.runners.webpack.module.rules[0].use[0];

        expect(testLoaderResult.options.foo).toBe('baz');
    });

    test('Using query and same nested object structure should not conflict ', () => {
        expect(result.addons.eslint.extends).toHaveLength(3);
        expect(result.addons.eslint.extends).toContain('baz');
    });

    test('Multiple search queries should not conflict', () => {
        const testLoaderResult = result.runners.webpack.module.rules[0].use[0];
        const otherLoaderResult = result.runners.webpack.module.rules[0].use[1];

        expect(testLoaderResult.loader).toBe('test-loader');
        expect(testLoaderResult.options.foo).toBe('baz');

        expect(otherLoaderResult.loader).toBe('other-loader');
        expect(otherLoaderResult.options.foo).toBe('baz');
        expect(otherLoaderResult.options.bar).toBe('baz');
    });

    test.skip('Query function should receive original value', () => {
        // Call mock fn first
        const webpackA = configA.runners.webpack();

        expect(mockJsonQueryResolver).toBeCalledWith(
            webpackA.module.rules[0].use[0]
        );
    });
});
