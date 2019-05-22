#!/usr/bin/env node
const chalk = require('chalk');
const yargs = require('yargs');
const inquirer = require('inquirer');

const getBanner = require('../lib/utils/getBanner');
const resolvePresetName = require('../lib/utils/resolvePresetName');
const initAppPkg = require('../lib/utils/initAppPkg');
const installDeps = require('../lib/utils/installDeps');
const updateAppPkg = require('../lib/utils/updateAppPkg');
const createConfigFile = require('../lib/utils/createConfigFile');
const initScripts = require('../lib/utils/initScripts');
const prepareBoilerplate = require('../lib/utils/prepareBoilerplate');
const hasCommand = require('../lib/utils/hasCommand');
const { version } = require('../package.json');

process.on('unhandledRejection', err => {
    console.log();
    console.log(chalk.red('Oops!'), 'An error occured.');
    console.log('If you specified presets, please make sure they are spelled correctly.');
    console.log();
    throw err;
});

async function run (argv) {
    console.log(getBanner(version));

    if (argv.presets.length) {
        console.log('These Presets will be used:');
        argv.presets.map(resolvePresetName).forEach(name => console.log(`> ${name}`));
        console.log();
    }

    // check package manager
    let pkgManager = argv.install;
    if (!hasCommand(pkgManager)) {
        console.log(chalk.yellow(`Package manager '${pkgManager}' not found.`));
        pkgManager = 'npm'; // fall back to npm
    }
    console.log('Install using:', pkgManager);

    console.log();

    const input = await inquirer.prompt({
        type: 'confirm',
        name: 'confirm',
        message: `Set up new project in current directory?\nExisting files may be ${chalk.red(
            'overwritten'
        )}.`,
    });

    if (!input.confirm) {
        console.log(chalk.gray('Setup aborted.'));
        process.exit();
    }

    console.log();

    initAppPkg();
    installDeps(argv.presets, pkgManager);
    updateAppPkg();

    if (argv.presets.length) {
        createConfigFile(argv.presets);
    }

    initScripts();
    prepareBoilerplate(argv.presets);

    console.log();
    console.log(chalk.green.bold('ALL DONE!'));
    console.log();
    console.log('Your project is now ready.');
    console.log('Run', chalk.yellow(`${pkgManager} start`), 'to start the dev server.');

    process.exit();
}

run(
    yargs
        .command('init [presets..]', 'Initialize project in current directory.', cmd => {
            cmd.option('presets', {
                type: 'array',
                default: [],
                describe: 'The optional presets you want to use.',
            });
            cmd.option('i', {
                alias: 'install',
                type: 'string',
                default: 'yarn',
                describe:
                    'Defines the package manager that should be used.\nIf this one is not available, it will fall back to npm.',
            });
        })
        .example(
            '$0 init react git://github.com/user/some-preset.git',
            'Initializes a new project with React preset and a custom preset from git.'
        )
        .help()
        .usage(getBanner(version))
        .alias('v', 'version')
        .alias('h', 'help')
        .demandCommand()
        .strict().argv
);
