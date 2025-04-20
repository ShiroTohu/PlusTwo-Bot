const { logger } = require('../logger.js');
const setupDatabase = require('./setupDatabase.js');
const process = require('node:process');

const sequelize = setupDatabase();

const User = sequelize.models.User;
const Guild = sequelize.models.Guild;
const Score = sequelize.models.Score;

module.exports = { User, Guild, Score }
