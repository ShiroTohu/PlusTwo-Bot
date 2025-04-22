// this module is for when the user parses --help as a argument to the
// program.

const { Command } = require('commander');
const program = new Command();

program
    .name('Jerma Bot')
    .description('+2/-2 your friends with this funny little bot.')
    .version('0.0.0')
    .option('-v, --verbose', 'increase the output of logs.', 0)
    .option('--prod', 'Production database is used. requires .env to have login information.')
    .option('--setup', 'env setup tool is triggered, useful for recondiguring the env file after initalization.')
    .option('--create-commands', 'sends a request to discord to create commands, is REQUIRED to be ran before running the bot.')

program.parse();
