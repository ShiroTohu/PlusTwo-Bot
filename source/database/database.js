// responsible for initalizing the database
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const { logger } = require('../logger.js');
const config = require('./config.js')[env];

async function setupDatabase(force) {
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

  logger.info('Syncing Models');
  await sequelize.sync({ force });

  if (env == 'test') {
    await insertDummyData(sequelize);
  }

  // This syncs the models (User, Guild, Score) with the database making sure that everything
  // such as rows and columns match up. If a model doesn't exist in the database a table will
  // be created for it.
  logger.info('Syncing Models');
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
  ])

  await Guild.bulkCreate([
    {guild_id: 827597916039016962},
    {guild_id: 667792375797365060},
    {guild_id: 626184277834279176},
  ]);

  await Score.bulkCreate([
    {guild_id: 827597916039016962, user_id: 455840886956257287},
    {guild_id: 667792375797365060, user_id: 161640664076316994},
    {guild_id: 626184277834279176, user_id: 997027454665226734},
  ]);
}

module.exports = { setupDatabase };