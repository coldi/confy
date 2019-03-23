# App Build Scripts Sass/SCSS Preset

Extends App Build Scripts configuration with SCSS support.

## Quick Overview

This preset enables:

- Support for Sass in `.scss` files
- A new option to define a styles folder

```js
// .apprc.js
module.exports = {
  options: {
    // Define the directory for your basic .scss files.
    // This tells the Sass compiler where to look for imports in the first place.
    // (like _variables.scss or _mixins.scss)
    stylesDir: 'styles', // Relative to srcDir
  },
};
```

## Installation

Using eC CLI:

```
ab-cli init sass
```

If you want to add this preset to an existing project, please read the App Build Scripts [installation guide](https://github.com/coldi/app-build-scripts/packages/ab-scripts).
