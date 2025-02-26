const fs = require('node:fs');
const { logger } = require('./logger.js');

function verifyDotEnv() {
  if (!fs.existsSync('.env')) {
    logger.fatal('.env file NOT found');
    process.exit();
  }
  
  logger.info('.env file found');

  const requiredVariables = [
    "DISCORD_TOKEN",
  ];

  const databaseVariables = [
    "DB_NAME",
    "DB_USER",
    "DB_PASSWORD",
    "DB_HOST",
    "DB_TEST_HOST",
  ];

  checkEnv(requiredVariables);

  if (process.env.NODE_ENV == 'production') {
    logger.info('production environment variable detected, proceeding to check database credentials in .env')
    checkEnv(databaseVariables);
  }
}

function checkEnv(variables) {
  for (const index in variables) {
    variable = variables[index]; 
    if (variable in process.env) {
      logger.info(`${variable} found in process.env`);
    } else {
      logger.fatal(`${variable} NOT found in process.env. Check that you have set the ${variable} variable in your .env file`);
      process.exit();
    }
  }
}

module.exports = { verifyDotEnv };
