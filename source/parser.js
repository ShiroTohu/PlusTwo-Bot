const { Command } = require('commander');
const program = new Command();

program
  .name('Jerma Bot')
  .description('Debt collector.')
  .version('0.0.0')
  .option('-v, --verbose', 'increase the output of logs', 0)

program.parse();
