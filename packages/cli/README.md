# Confy CLI

Start building modern front end projects in seconds.

## Quick Overview

Confy CLI is a command-line tool that you can use to set up Confy projects with only one command.

[Learn more about Confy.](https://github.com/coldi/confy/package/core)

## Installation

**Requirements:** You need at least Node.js >=8.6 and NPM >=5 installed. Yarn >=1.0 is also supported.

```
npm install -g @confy/cli
```

## Usage

```
confy init [...presets]
```

Note that the package name is `@confy/cli` whereas the _CLI command_ is `confy`.

### Examples

Set up a new project in the current directory:

```
confy init
```

Set up a new project in the current directory with official Confy React preset and some custom preset from GitHub:

```
confy init react git://github.com/user/some-preset.git
```

### Notes

**Using npm presets:** Preset names get resolved internally by prefixing `@confy/preset-`.<br>
Therefore a preset name like `react` is resolved and `npm install`ed as `@confy/preset-react`.<br>
If you want to publish an Confy preset, make sure to prefix it correctly.

**Using git presets:** When using a preset from git directly, the repository name needs to match the name in the preset's `package.json`.<br>
According to above that is `some-preset`.

## Presets

A preset source must contain a valid `package.json` in order to be installable by NPM.

It can contain an extended configuration for Confy by providing a root
`apprc.js` file.

You can also use a preset for project boilerplating.<br>
If your preset contains a root folder `/boilerplate`, then all the content inside will be copied
to your project root upon initialization. Sub directory structures included.

Boilerplate presets can be helpful if you want to start out with some basic features like
router setup or default page layouts or _you name it_.

### Example

Here's a basic file structure of how a preset can look:

```
/
  boilerplate/
    src/
      index.js
  apprc.js
  package.json
```

## Acknowledgements

We are grateful to the authors of existing related projects for their ideas and inspiration:

[Preact CLI](https://github.com/developit/preact-cli)<br>

## License

MIT
