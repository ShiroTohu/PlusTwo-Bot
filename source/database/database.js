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

  // User.belongsToMany(Guild, { through: Score, foreignKey: 'userId' });
  // Guild.belongsToMany(User, { through: Score, foreignKey: 'guildId' });

  User.belongsToMany(Guild, {through: Score});
  Guild.belongsToMany(User, {through: Score});
  User.hasMany(Score);
  Score.belongsTo(User);
  Guild.hasMany(Score);
  Score.belongsTo(Guild);

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
  // console.log(sequelize);

  await sequelize.models.User.bulkCreate([
    {id: '455840886956257287', username: 'Jeremy Elbertson'},
    {id: '161640664076316994', username: 'Otto'},
    {id: '997027454665226734', username: 'BallFondler'},
    {id: '667792375797365060', username: 'Among Us Guy'}
  ]);

  await sequelize.models.Guild.bulkCreate([
    {id: '827597916039016962'}
  ]);

  await sequelize.models.Score.bulkCreate([
    {GuildId: '827597916039016962', UserId: '455840886956257287', score: 985},
    {GuildId: '827597916039016962', UserId: '161640664076316994', score: 0},
    {GuildId: '827597916039016962', UserId: '997027454665226734', score: 12},
    {GuildId: '827597916039016962', UserId: '667792375797365060', score: 82},
  ]);
}

module.exports = { setupDatabase, insertDummyData };
