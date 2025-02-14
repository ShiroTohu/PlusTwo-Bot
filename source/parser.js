const { Command } = require('commander');
const program = new Command();

program
  .name('Jerma Bot')
  .description('Debt collector')
  .version('0.0.0')

program.parse();
