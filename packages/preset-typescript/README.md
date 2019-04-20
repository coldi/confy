# @confy/preset-typescript

Extends Confy configuration with TypeScript support.

## Quick Overview

This preset enables:

- Support for TypeScript in .ts(x) files
- Configure tsconfig in .apprc.js file

```js
// .apprc.js
module.exports = {
  addons: {
    typescript: {
      // your tsconfig options here ...
    },
  },
};
```

## Installation

Using [@confy/cli](./packages/cli):

```
confy init typescript
```

If you want to add this preset to an existing project, please read the Confy [installation guide](https://github.com/coldi/confy).
