// responsible for initalizing the database
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const { logger } = require('../logger.js');
const config = require('./config.js')[env];

function setupDatabase() {
  logger.info(`Setting up ${env} Database`);
  // defaults to the devleopment database
  const sequelize = new Sequelize(
    config
  );

  logger.info('Setting up models');
  // module is ran like a function
  const User = require('./models/user.model.js')(sequelize, Sequelize.DataTypes);
  const Guild = require('./models/guild.model.js')(sequelize, Sequelize.DataTypes);
  const Score = require('./models/score.model.js')(sequelize, Sequelize.DataTypes, Guild, User);

  // TODO: commander
  const force = process.argv.includes('--force') || process.argv.includes('-f');

  // This syncs the models (User, Guild, Score) with the database making sure that everything
  // such as rows and columns match up. If a model doesn't exist in the database a table will
  // be created for it.
  logger.info('Syncing Models');
  sequelize.sync({ force });
};

module.exports = { setupDatabase };