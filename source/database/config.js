// database environments, feel free to change these if needed
const { logger } = require('./../logger.js');

const process = require('node:process');

module.exports = {
    development: { 
        dialect: "sqlite",
        logging: msg => logger.info(msg),
        storage: './development.sqlite'
    },
    test: {
        dialect: "sqlite",
        logging: false,
        storage: './testing.sqlite'
    },
    production: {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_TEST_HOST,
        dialect: "postgres",
        logging: msg => logger.info(msg)
    }
};
