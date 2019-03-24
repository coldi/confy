# Confy

Confy provides a fast and painless integration of modern development tools.

## Quick Overview

You need no configuration to get started with full ES6+ and autoprefixed CSS support right away.

It's possible to extend the configuration with other presets (e.g. Sass, React)
or adjust it to match your specific project needs.

Confy was made to be flexible and extendible.

## Getting started

**Requirements:** You need at least Node.js >=8.6 and NPM >=5 installed.<br>

### Using Confy CLI

When starting with a new project, it's recommended you `npm install -g @confy/cli`
and then run `confy init` in your project folder.

Done!

[Learn more about Confy CLI.](https://github.com/coldi/confy/tree/master/packages/cli)

### Adding Confy manually

**Step 1:** Install Confy with `npm i @confy/core --save-dev`:

**Step 2:** Add the following `scripts` entries to your `package.json` file inside your project folder:

```json
{
  "scripts": {
    "init": "confy-core init --env=development",
    "start": "confy-core  start --env=development",
    "build": "confy-core  build --env=production",
    "build-watch": "confy-core  build --watch --env=production",
    "test": "confy-core  test --env=test",
    "config": "confy-core  show-config --env=development"
  }
}
```

**Step 3:** Run `npm run init`.

**Step 4:** Create `src/index.html` and `src/index.js` and start writing some code!

**Step 5:** Run `npm start` to start the development server.

You can now open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>
When you’re ready to deploy to production, create a minified bundle with `npm run build`.

You don't need to set up any other tools like Webpack, Babel, or Jest.<br>
That's exactly what Confy does for you.

Follow these steps and you're good to go!

### Getting started with (S)CSS

As mentioned above, styling with autoprefixed CSS is already set up for you.<br>
All you need to do is add some `.css` file and include it in your project.<br>
The quickest way to achieve this is by importing it in your `src/index.js` like so:

```js
import './path/to/main.css';
```

**Support for Sass/SCSS** is available as a preset: [@confy/preset-sass](https://github.com/coldi/confy/tree/master/packages/preset-sass)

## Run commands

### `npm run init`

As of now, this writes an `.eslintrc.json` file to your project folder.
This is useful if you want to enable ESLint support in your IDE.<br>
So at the moment, running this command is only necessary when changing any ESLint related configuration
in `.apprc.js`.<br>

_This also happens automatically on every other command._

**NOTE:** You should therefore not edit `.eslintrc.json` directly.<br>
Extend `addons.eslint.rules` in `.apprc.js` to change your project's ESLint rules.<br>
More information below.

### `npm run start`

Runs your code in development mode using Webpack dev server.<br>
Open [http://localhost:3000/](http://localhost:3000/) to see it in the browser.

### `npm run build`

Builds your files for production to the `build` folder (default).<br>
The build is minified, optimized and ready to be deployed.

### `npm run build-watch`

Same as `npm run build` but watches for changes and performs new builds accordingly.

### `npm test`

Let Jest run your tests.

It will look for them in `*.test.js`, `*.spec.js` files or `__test__/*` folders.

### `npm run config`

Prints the used configuration settings in your console.

## How to extend and customize

One goal with Confy was not only to give you a single, pre-configured toolset.
It was also important for us that it can be extended and customized.

That's where `.apprc.js` comes in play.

### Using presets

Let's say you want to add support for one of these UI libraries, like VueJS, React or this other fancy thing.

Fortunately there is a React preset available for Confy!
It jumps in and configures Babel, ESLint, Jest, Webpack, HMR, and so on.

Sounds complicated?<br>
Let's see how we implement it in your project:

**Step 1:** In your project root create a file `.apprc.js` with the following content:

```js
module.exports = {
  presets: ['react'],
};
```

**Step 2:** Install preset dependency:<br>
`npm i --save-dev @confy/preset-react`

**Step 3:** To update your local `.eslintrc.json` file so that your IDE immediately knows about
React and JSX related rules:<br>
`npm run init`

Well... That's it!<br>
You can now start creating React components using JSX syntax and
also write unit tests for them using Jest.

### Change configuration settings

Apparently adding support for React wasn't that difficult.<br>
So, how hard can it be to change the configuration settings on your own, right?

#### Options

Changing options in `.apprc.js` is one way to adjust the configuration according to your environment.

Below you find a list of all available options with their default values, defined by Confy.

```js
// .apprc.js

module.exports = {
  // ...

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
    entryFiles: ['index.js'],

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

_NOTE:_ Presets may introduce more options when necessary.

#### The idea of Options, Addons and Runners

As you may have expected, using options isn't the only thing you can do with `.apprc.js`.<br>
There is also the concept of "addons" and "runners".
These names are used to define two groups of tools within Confy.

Addons are all the tools that runners need to run your code.<br>
Therefore addons in `.apprc.js` contain the configurations for Babel and ESLint. Maybe more in the future.<br>
Babel is especially important here, as it transpiles your future JS code for not so modern browsers.

As mentioned before, runners eventually run your code and do things with it, utilizing addons.
These runners are Webpack and Jest..<br>
Webpack bundles your code. Jest runs your tests. They do not have much in common,
**except** sharing options and addons as they need!

Here is a rough explanation of how our extendable configuration concept works:

- First Confy gathers all `.apprc.js` files by looking inside your project root
  and resolving any presets that you added.
- It then merges all configurations into one, step by step, in this order `root -> [...presets] -> project`:
  - It starts by merging all **options** in that order.<br>
  - It continues by merging all **addons** in that order.
  - Finally it merges all **runners** in that order.
- The resulting configuration object is the one that is used inside all the tools.

Note that every options, addons or runners section in `.apprc.js`
can receive the current state of the merged configuration, when defined as a function.

Here is a practival overview of different approaches on how to update a configuration:

```js
// .apprc.js in your project

module.exports = {
  // options, addons and runners always receive the whole config object when defined as a function.
  addons: (currentConfig) => ({
    eslint: {
      // When extending arrays you should use functions and spread the previous items in.
      presets: (presets) => [...presets, 'moar-rules'],
      // Note: When working with arrays like this you can also use .map() and .filter()!

      // Objects on the other hand get shallow merged with the previous content automatically.
      rules: {
        'some-rule': 'warn',
      },

      // Therefore *if* you really want to overwrite an object setting
      // use a function and don't spread previous values.
      // Use with caution, though!
      something: () => ({
        key: 'this will overwrite `something` completely',
      }),
    },
  }),
};
```

#### Advanced usage

Bad things first: If you want to add full support for an advanced library like React from scratch,
you need to know all the steps necessary. Like adding presets to Babel, configure React Hot Loader,
Jest, and so on.<br>
That's a lot to ask for a config library that describes itself as "painless".

The good thing is, though, that it's possible to update the all the configuration settings in one place and
change only the parts you need for what you want to achieve.

Of course this sounds very theoretical and we will not go in detail here by
explaining all the possibilities you have inside an `.apprc.js` file.

For advanced usage it's a good start to look at the
[React preset source](https://github.com/coldi/confy/tree/master/packages/preset-react/apprc.js) itself.

## Acknowledgements

Confy is grateful to the authors of existing related projects for their ideas and inspiration:

[Create React App](https://github.com/facebookincubator/create-react-app)<br>
[kcd-scripts](https://github.com/kentcdodds/kcd-scripts)<br>

## License

MIT
