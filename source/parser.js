const { Command } = require('commander');
const program = new Command();

program
  .name('Jerma Bot')
  .description('Debt collector')
  .version('0.0.0')
  .option('--bot-token', 'discord bot token')
  .option('--db-username', 'database username')
  .option('--db-password', 'database password')
  .option('--db-host', 'database host')
  .option('--db-name', 'database name')

program.parse();
