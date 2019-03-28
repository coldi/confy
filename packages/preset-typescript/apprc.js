const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    addons: () => ({
        typescript: {
            compilerOptions: {
                sourceMap: true,
                allowJs: true,
                allowSyntheticDefaultImports: true,
                module: 'esnext',
                moduleResolution: 'node',
                lib: ['es2015', 'dom'],
                target: 'es5',
            },
        },
        babel: {
            presets: (presets = []) => [
                ...presets,
                require.resolve('@babel/preset-typescript'),
            ]
        },
        eslint: {
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: path.join(process.cwd(), 'tsconfig.json'),
            },
            extends: (entries = []) => [
                ...entries,
                'plugin:@typescript-eslint/recommended',
                'prettier/@typescript-eslint',
            ],
            plugins: (plugins = []) => [
                ...plugins,
                '@typescript-eslint',
            ],
            settings: {
                'import/extensions': (extensions = []) => [
                    ...extensions,
                    '.ts',
                    '.tsx',
                ],
            },
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
            },
        },
        prettier: {
            parser: 'typescript',
        },
    }),
    runners: () => ({
        webpack: {
            module: {
                rules: (rules = []) => {
                    const jsRule = rules.find(rule => '.js'.match(rule.test));
                    const nonJsRules = rules.filter(rule => !'.js'.match(rule.test));
                    const tsRule = { ...jsRule, test: /\.(j|t)sx?$/ };
                    return [tsRule, ...nonJsRules];
                },
            },
            resolve: {
                extensions: (extensions = []) => [
                    ...extensions,
                    '.ts',
                    '.tsx',
                ],
            },
            plugins: (plugins = []) => [
                ...plugins,
                new ForkTsCheckerWebpackPlugin({ async: false }),
            ],
        },
        jest: {
            moduleFileExtensions: (extensions = []) => [
                ...extensions,
                'ts',
                'tsx',
            ],
            transform: {
                '\\.tsx?$': 'babel-jest',
            }
        }
    }),
};
