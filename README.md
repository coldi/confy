<div align="center">

# @confy

<p>
Re-usable configurations for your web apps
</p>

<p>

[![NPM Version](https://img.shields.io/npm/v/@confy/core.svg?style=flat)](https://www.npmjs.com/package/@confy/core)
[![Activity](https://img.shields.io/github/last-commit/coldi/confy.svg?style=flat)](https://github.com/coldi/confy)
[![MIT License](https://img.shields.io/npm/l/@confy/core.svg?style=flat)](https://www.npmjs.com/package/@confy/core)
[![Tweet](https://jpillora.com/github-twitter-button/img/tweet.png)](https://twitter.com/intent/tweet?text=Check+out+Confy!+%F0%9F%91%8D+https%3A%2F%2Fgithub.com%2Fcoldi%2Fconfy)

</p>

<hr>

</div>

## Table of contents

- [Why](#why)
- [What's inside](#whats-inside)
- [Usage](#usage)
  - [Start a new app](#start-a-new-app)
  - [Add to an existing app](#add-confy-to-an-existing-app)
  - [Using presets](#using-presets)
  - [Overriding configs](#overriding-configurations)
  - [Custom presets](#create-a-custom-preset)
- [Limitations](#limitations)
- [Acknowledgments](#acknowledgments)
- [License](#license)

<hr>

## Why

When you start a new web app nowadays you soon end up using a lot of tools. Like Babel for transpiling your next level JS. Or Webpack for bundling your code. Or maybe you want to use a linter like ESLint. And what about tests?

Configuring these tools can be very tricky and time consuming. And if you maintain more than one app, you start copying all config files over and over again.

Confy abstracts away all of these things. It comes with some opinionated defaults, but all configurations can be adjusted and extended on a project level. Without "ejecting".

## What's inside

The following tools are included in the [@confy/core](./packages/core) package:

- Babel
- ESLint
- Prettier
- Webpack
- Jest

### Presets

Confy offers ready-to-use presets for the following setups:

- React ([@confy/preset-react](./packages/preset-react))
- TypeScript ([@confy/preset-typescript](./packages/preset-typescript))
- Sass/SCSS ([@confy/preset-sass](./packages/preset-sass))

## Usage

> 👉 Confy requires `Node >=8.6` with `NPM >=5.6` or `Yarn >=1.0`

### Start a new app

When you want to set up a new app in an empty folder, you can use [@confy/cli](./packages/cli) by running:

```
npx @confy/cli init react
```

This will set up your new project with all tools mentioned above and additionally pre-configured for usage with React.

### Add Confy to an existing app

Install `@confy/core` to your project's `devDependencies`:

```
npm i --save-dev @confy/core
// or
yarn add -D @confy/core
```

The core package provides a CLI, that you can call in your NPM `scripts`:

```json
// package.json
{
  "scripts": {
    "init": "confy-core init --env=development",
    "start": "confy-core start --env=development",
    "build": "confy-core build --env=production",
    "test": "confy-core test --env=test",
    "config": "confy-core show-config --env=development"
  }
}
```

`npm run init` will generate IDE related config files in your project, like `.eslintrc` or `.prettierrc`. These will also be updated when you run the other scripts.

By running `npm start` you can start the Webpack DevServer with the default Confy settings. Make sure your app matches these settings or otherwise adjust them to your needs.

> 💡 The [@confy/core](./packages/core) package has a more detailed command list.

### Using presets

You can use one or more presets in your Confy project.

If you want to add support for TypeScript for example, you need to a add the preset to your `devDependencies`:

```
npm i --save-dev @confy/preset-typescript
// or:
yarn add -D @confy/preset-typescript
```

Next, add the name of the preset to your project's `.apprc.js` file:

```js
// .apprc.js file in your project root folder
module.exports = {
  presets: ['typescript'],
};
```

Finally you should `npm run init`, to update config files for your IDE.

> 👍 You can now compile `.ts` files in your project.

### Overriding configurations

If you want to change the default config, you can do that in the `.apprc.js` file in your project root folder.

```js
// basic outline of .apprc.js
module.exports = {
  presets: [], // like 'react', 'typescript', 'git://github.com/user/foo.git'
  options: {
    srcDir: 'src',
    entryFiles: ['index.js'], // relative to srcDir
    htmlTemplate: 'index.html', // relative to srcDir
    // a few more ...
  },
  addons: (config) => ({
    babel: {/* adjust babelrc */},
    eslint: {/* adjust eslintrc */},
    prettier: {/* adjust prettierrc */},
  }),
  runners: (config) => ({
    webpack: {/* adjust webpack.config.js */},
    jest: {/* adjust jest.config.js */},
  }),
};
```

> 💡 You can find a list of all available options in the [@confy/core](./packages/core) package.

In the concept of Confy not all tools are handled equally. They are divided in `addons` and `runners`. If you define these properties as functions, they will receive the *current* config object. This means the addons will receive `{ options }` and the runners receive `{ options, addons }`.

The reason for this is related to how Confy merges multiple configurations from presets to your own app.

> 💡 You can read more about it in the [@confy/core](./packages/core) package, if you want to.

### Create a custom preset

A preset source must contain a valid `package.json` in order to be installable by NPM.

It can contain an extended configuration for Confy by providing a root
`apprc.js` file.

You can also use a preset for project boilerplating.<br>
If your preset contains a root folder `/boilerplate`, then all the content inside will be copied
to your project root upon initialization (CLI only). Sub directory structures included.

#### Example

Here's a basic file structure of how a preset can look:

```
/
  boilerplate/
    src/
      index.js
  apprc.js
  package.json
```

#### How presets are resolved

**Using NPM presets:** Preset names get resolved internally by prefixing `@confy/preset-`.<br>
Therefore a preset name like `react` is resolved and installed as `@confy/preset-react`.<br>

> ☝ If you want to publish an NPM Confy preset, please create a PR for now.

**Using Git presets:** When using a preset from Git directly, the repository name needs to match the name in the preset's `package.json`.<br>
So when using an url like `git://github.com/user/some-preset.git`
the package name should be `some-preset`.

## Limitations

Every solution that abstracts configuration has its limitations. So does Confy:

- Confy doesn't write out the config files for runners, like `webpack.config.js`. So if you rely on your IDE reading and using these files, this might be an issue.
- The list of tools that Confy uses at its core is not extendable. This means you can not add another tool to the stack. You can only configure the existing core tools for now. So if you want to bundle with Rollup or use Mocha for your tests, this might be an issue.

There will be more limitations! Please file an issue, if you find one.

## Acknowledgments

Confy is inspired by these awesome projects:

[kcd-scripts](https://github.com/kentcdodds/kcd-scripts)<br>
[create-react-app](https://github.com/facebook/create-react-app)<br>
[preact-cli](https://github.com/developit/preact-cli)<br>

## License

MIT
