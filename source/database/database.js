const { logger } = require('../logger.js');
const setupDatabase = require('./setupDatabase.js');

const sequelize = setupDatabase();

sequelize.sync().then(() => {
  logger.info('sequelize synced');
}).catch(() => {
  logger.fatal('sequelize instance could not be synced');
  process.exit();
});

const User = sequelize.models.User;
const Guild = sequelize.models.Guild;
const Score = sequelize.models.Score;

(async () => {
  const scores = await Score.findAll({});
  if (!scores.length) logger.warn('database is empty (not a problem if you expect the database to be empty)');
})()

module.exports = { User, Guild, Score }