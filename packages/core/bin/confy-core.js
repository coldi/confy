#!/usr/bin/env node

const yargs = require('yargs');
const invariant = require('invariant');

const build = require('../lib/commands/build');
const start = require('../lib/commands/start');
const test = require('../lib/commands/test');
const showConfig = require('../lib/commands/showConfig');

const settings = require('../lib/settings');
const writeFile = require('../lib/utils/writeFile');
const getConfig = require('../lib/utils/getConfig');

const { argv } = yargs;

process.env.NODE_ENV = process.env.NODE_ENV || argv.env;

invariant(
    process.env.NODE_ENV !== undefined,
    'The NODE_ENV environment variable is required but was not specified.'
);

// Always rebuild .eslintrc file.
writeFile(settings.appPath, '.eslintrc.json', getConfig().addons.eslint);

yargs
    .command(build)
    .command(start)
    .command(test)
    .command(showConfig)
    .help()
    .argv;
