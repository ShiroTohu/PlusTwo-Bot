const fs = require('node:fs');
const { logger } = require('./logger.js');

const process = require('node:process');

// verifies that the required variables are in the .venv file
function verify() {
    if (fs.existsSync('.env')) {
        require('@dotenvx/dotenvx').config(); // despite it being
        logger.info('.env file found');
    } else {
        logger.fatal('.env file NOT found');
        process.exit(); 
    } 
 
    // variables that are required in order for the program to run
    const requiredVariables = [
        "DISCORD_TOKEN",
    ];

    // required only when the user connects to postgres (production environment)
    const databaseVariables = [
        "DB_NAME",
        "DB_USER",
        "DB_PASSWORD",
        "DB_HOST",
        "DB_TEST_HOST",
    ];

    checkEnv(requiredVariables);

    // If the production environment variable is specified then the credentials for the server must be in the env file.
    if (process.env.NODE_ENV == 'production') {
        logger.info('production environment variable detected, proceeding to check database credentials in .env')
        checkEnv(databaseVariables);
        logger.info('production environment variables verified');
        return;
    }

    logger.info('environment variables verified');
}

// checks if a environment variable exists given a list.
function checkEnv(variables) {
    for (const index in variables) {
        const variable = variables[index]; 
        if (!(variable in process.env)) {
            logger.fatal(`${variable} NOT found in process.env. Check that you have set the ${variable} variable in your .env file`);
            exit();
        } 
    }
}

module.exports = { verify };
