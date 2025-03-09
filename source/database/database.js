const { logger } = require('../logger.js');
const setupDatabase = require('./setupDatabase.js');

const sequelize = setupDatabase();

const User = sequelize.models.User;
const Guild = sequelize.models.Guild;
const Score = sequelize.models.Score;

sequelize.sync().then(() => {
  logger.info('sequelize synced');
}).catch(() => {
  logger.fatal('sequelize instance could not be synced')
  process.exit();
});

module.exports = {User, Guild, Score}