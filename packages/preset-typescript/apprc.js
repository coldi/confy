const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

function putPrettierLast(entries) {
    const prettier = entries.filter(a => (/prettier/i).test(a));
    const others = entries.filter(a => !(/prettier/i).test(a));
    return others.concat(prettier);
}

module.exports = {
    addons: () => ({
        typescript: {
            compilerOptions: {
                baseUrl: process.cwd(),
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
            parser: require.resolve('@typescript-eslint/parser'),
            parserOptions: {
                project: path.join(process.cwd(), 'tsconfig.json'),
            },
            extends: (entries = []) => putPrettierLast([
                ...entries,
                'plugin:@typescript-eslint/recommended',
                'prettier/@typescript-eslint',
            ]),
            plugins: (plugins = []) => [
                ...plugins,
                '@typescript-eslint/eslint-plugin',
            ],
            settings: {
                'import/extensions': (extensions = []) => [
                    ...extensions,
                    '.ts',
                    '.d.ts',
                    '.tsx',
                ],
            },
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                // use the @typescript-eslint rule for unused vars
                'no-unused-vars': 'off',
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
            moduleFileExtensions: (extensions = ['js']) => [
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
