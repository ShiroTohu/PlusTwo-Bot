const fs = require('node:fs');
const { logger } = require('./logger.js');

function verifyDotEnv() {
  if (!fs.existsSync('.env')) {
    logger.fatal('.env file NOT found');
    process.exit();
  }
  
  logger.info('.env file found');

  const environmentVariables = [
    "DISCORD_TOKEN",
    "DB_NAME",
    "DB_USER",
    "DB_PASSWORD",
    "DB_HOST",
    "DB_TEST_HOST",
  ];

  for (const index in environmentVariables) {
    variable = environmentVariables[index]; 
    if (variable in process.env) {
      logger.info(`${variable} found in process.env`);
    } else {
      logger.fatal(`${variable} NOT found in process.env. Check that you have set the ${variable} variable in your .env file`);
      process.exit();
    }
  }
}

module.exports = { verifyDotEnv };
