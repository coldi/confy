# @confy/core

The core package provides the base configuration functionality and a CLI that you can use in your NPM scripts.

You can [read more about Confy here](https://github.com/coldi/confy).

## CLI commands

### `confy-core init --env=development`

Writes config files to your project folder.
This is useful if you want to enable ESLint support in your IDE.<br>
So at the moment, running this command is only necessary when changing any ESLint or Prettier related configuration in `.apprc.js`.<br>

_Config files are also updated on every other command._

### `confy-core start --env=development`

Runs your app in development mode using Webpack DevServer.<br>
Open [http://localhost:3000/](http://localhost:3000/) to view it in the browser.

### `confy-core build --env=production`

Builds your files for production to the `build` folder (default).<br>
The result is minified, optimized and ready to be deployed.

### `confy-core build --watch --env=production`

Same as above but watches for file changes and performs new builds on the fly. Can be useful for legacy projects.

### `confy-core test --env=test`

Let Jest run your tests.

It will look for them in `*.test.js`, `*.spec.js` files or `__test__/*` folders.

### `confy-core show-config --env=development`

Prints the configuration settings for `development` or `production` to the console.

## Configuration

### Options

Changing options in `.apprc.js` is one (quick!) way to adjust the configuration according to your project needs.

Below you find a list of all available options with their default values.

```js
// .apprc.js

module.exports = {
  options: {
    // Define directory for your project files.
    srcDir: 'src',

    // Define the directory for your static files.
    assetsDir: 'assets', // Relative to srcDir

    // Define your output directory.
    buildDir: 'build',

    // Define files for main bundle.
    // Path is relative to srcDir.
    // May contain your css entry file as well, so you don't have to import it.
    entryFiles: ['index'],

    // Set js output filename in webpack.output
    jsOutputFile: '[name].bundle.js',

    // Set css output filename for MiniCssExtractPlugin
    cssOutputFile: 'style.css',

    // Set css filename for dynamic chunks using MiniCssExtractPlugin
    cssChunkFile: '[id].css',

    // Set path to html template.
    htmlTemplate: 'index.html', // Relative to srcDir

    // Define page title.
    title: 'New App',

    // Code style indention
    tabWidth: 4,

    // Hostname for webpack dev server.
    host: '0.0.0.0',

    // Port for webpack dev server.
    port: 3000,

    // List of supported browsers for babel-preset-env and postcss autoprefixer.
    browsersList: [
      '>2.5%',
      'last 4 chrome versions',
      'last 4 ff versions',
      'last 2 edge versions',
      'last 2 ios versions',
      'last 2 safari versions',
      'not ie 11',
    ],

    // The file size in bytes under which the url-loader kicks in
    // and base64-inlines your required files.
    // E.g.: When set to 5000, all files below 5KB will be inlined.
    inlineFileSize: -1, // Use -1 to disable, 0 for no limit at all

    // BELOW SHOULD NOT BE CHANGED IN MOST CASES!

    // Environment boolean flags.
    // Defines if we are in development mode (true) or production (false).
    devMode: process.env.NODE_ENV === 'development',

    // Defines if we are in test mode (true) or not (false).
    testMode: process.env.NODE_ENV === 'test',
  },
};
```

> NOTE: Presets may introduce more options when necessary.

### How it works

Confy has the concept of "options", "addons" and "runners".<br>
Options can be used to make quick changes to your config because they are referenced inside the tools.
Addons and runners are used to define two groups of tools within Confy.

Addons are all the tools that runners need to run your code.<br>
Therefore addons in `.apprc.js` contain the configurations for Babel and ESLint. Maybe more in the future.

Runners eventually run your code and do things with it, utilizing addons.
These runners are Webpack and Jest..<br>
Webpack bundles your code. Jest runs your tests. They do not have much in common, **except** sharing options and addons as they need.

Here is a rough explanation of how Confy's extendable configuration concept works:

- First Confy gathers all `.apprc.js` files by looking inside your project root and resolving any presets that you added.
- It then merges all configurations into one, step by step, in this order `root -> [...presets] -> project`:
  - It starts by merging all **options** in that order.<br>
  - It continues by merging all **addons** in that order.
  - Finally it merges all **runners** in that order.
- The resulting configuration object is the one that is used inside all the tools when they are eventually executed.

> Note that every options, addons or runners section in `.apprc.js` can receive the current state of the merged configuration, when defined as a function.

Here is a practical overview of different approaches on how to update a configuration:

```js
// .apprc.js in your project

module.exports = {
  // options, addons and runners always receive the whole config object when defined as a function.
  addons: (currentConfig) => ({
    eslint: {
      // When extending arrays you should use functions and spread the previous items in.
      presets: (presets) => [...presets, 'some-preset'],

      // Mutating the passed argument is also perfectly fine.
      plugins: (plugins) => {
        plugins.push('some-plugin');
        return plugins;
      }

      // Objects on the other hand get shallow merged with the previous value automatically.
      rules: {
        'some-rule': 'warn',
      },

      // Therefore *if* you really want to overwrite an object value
      // use a function and don't spread previous values.
      // Use with caution, though!
      something: () => ({
        key: 'this will overwrite `something` completely',
      }),
    },
  }),
};
```

### Advanced usage

To get an idea of how you can adjust Confy in order to work with a library like React, the [@confy/preset-react](https://github.com/coldi/confy/tree/master/packages/preset-react/apprc.js) itself is a good starting point.
