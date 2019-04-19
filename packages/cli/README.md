# @confy/cli

Confy CLI is a command-line tool that you can use to set up Confy projects in seconds.

You can [read more about Confy here](https://github.com/coldi/confy).

## Installation

> Confy CLI requires `Node >=8.6` with `NPM >=5.6` or `Yarn >=1.0`

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

Set up a new project in the current directory with [@confy/preset-react](./packages/preset-react) and some custom preset from GitHub:

```
confy init react git://github.com/user/some-preset.git
```
