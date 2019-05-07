# @confy/preset-node

Extends Confy configuration with NodeJS support.

## Quick Overview

This preset enables:

- Bundling of NodeJS applications with Webpack
- This preset sets the following default `options` in its `apprc.js` file:

```js
{
  jsOutputFile: 'node.bundle.js',
  browsersList: ['current node'],
  htmlTemplate: null,
  host: null,
}
```

## Installation

Using [@confy/cli](./packages/cli):

```
confy init node
```

If you want to add this preset to an existing project, please read the Confy [installation guide](https://github.com/coldi/confy).
