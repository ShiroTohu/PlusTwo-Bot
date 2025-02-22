// responsible for initalizing the database
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const { logger } = require('../logger.js');
const config = require('./config.js')[env];

async function setupDatabase() {
  logger.info(`Setting up ${env} Database`);
  // defaults to the devleopment database
  const sequelize = new Sequelize(
    config
  );

  // module is ran like a function
  const User = require('./models/user.model.js')(sequelize, Sequelize.DataTypes);
  const Guild = require('./models/guild.model.js')(sequelize, Sequelize.DataTypes);
  const Score = require('./models/score.model.js')(sequelize, Sequelize.DataTypes);

  User.belongsToMany(Guild, { through: Score, foreignKey: 'userId' });
  Guild.belongsToMany(User, { through: Score, foreignKey: 'guildId' });

  // This syncs the models (User, Guild, Score) with the database making sure that everything
  // such as rows and columns match up. If a model doesn't exist in the database a table will
  // be created for it.
  await sequelize.sync();

  return sequelize;
};

/**
 * inserts dummy data into the testing database
 */
async function insertDummyData(sequelize) {
  const User = sequelize.models.User;
  const Guild = sequelize.models.Guild;
  const Score = sequelize.models.Score;

  await User.bulkCreate([
    {user_id: 455840886956257287, username: 'Jeremy Elbertson'},
    {user_id: 161640664076316994, username: 'Otto'},
    {user_id: 997027454665226734, username: 'BallFondler'},
    {user_id: 667792375797365060, username: 'Among Us Guy'}
  ]);

  await Guild.bulkCreate([
    {guild_id: 827597916039016962}
  ]);

  await Score.bulkCreate([
    {guild_id: 827597916039016962, user_id: 455840886956257287},
    {guild_id: 827597916039016962, user_id: 161640664076316994},
    {guild_id: 827597916039016962, user_id: 997027454665226734},
    {guild_id: 827597916039016962, user_id: 667792375797365060},
  ]);

  // logger.info('Syncing Models');
  await sequelize.sync();
}

module.exports = { setupDatabase, insertDummyData };