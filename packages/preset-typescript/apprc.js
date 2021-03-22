const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// we need to require this plugin, so we can pass the recommended rules manually
// to our eslint rules config below.
// this is a workaround for extending 'plugin:@typescript-eslint/recommended' directly.
const TypescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');

function putPrettierLast(entries) {
    const prettier = entries.filter(a => /prettier/i.test(a));
    const others = entries.filter(a => !/prettier/i.test(a));
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
                skipLibCheck: true,
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
            ],
        },
        eslint: {
            parser: require.resolve('@typescript-eslint/parser'),
            parserOptions: {
                project: path.join(process.cwd(), 'tsconfig.json'),
            },
            extends: (entries = []) =>
                putPrettierLast([
                    ...entries,
                    'plugin:@typescript-eslint/base',
                    'plugin:@typescript-eslint/eslint-recommended',
                    // there is a bug when using this config directly.
                    // files in the `extends` field in this config cannot be resolved.
                    // TODO: once our eslint gets upgraded to >=6 this issue may be solved.
                    // 'plugin:@typescript-eslint/recommended',
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
                // spread the recommended rules manually as a workaround
                ...TypescriptEslintPlugin.configs.recommended.rules,
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-shadow': 'error',
                '@typescript-eslint/no-redeclare': 'error',
                '@typescript-eslint/no-use-before-define': 'error',
                // use the @typescript-eslint rule instead
                'no-shadow': 'off',
                'no-unused-vars': 'off',
                'no-redeclare': 'off',
                'no-use-before-define': 'off',
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
                    const nonJsRules = rules.filter(
                        rule => !'.js'.match(rule.test)
                    );
                    const tsRule = { ...jsRule, test: /\.(j|t)sx?$/ };
                    return [tsRule, ...nonJsRules];
                },
            },
            resolve: {
                extensions: (extensions = []) => [...extensions, '.ts', '.tsx'],
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
            },
        },
    }),
};
