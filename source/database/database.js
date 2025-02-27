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

  User.hasMany(Score, {foreignKey: 'userId'});
  Guild.hasMany(Score, {foreignKey: 'guildId'});

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
    {userId: '455840886956257287', username: 'Jeremy Elbertson'},
    {userId: '161640664076316994', username: 'Otto'},
    {userId: '997027454665226734', username: 'BallFondler'},
    {userId: '667792375797365060', username: 'Among Us Guy'}
  ]);

  await sequelize.models.Guild.bulkCreate([
    {guildId: '827597916039016962'}
  ]);

  await sequelize.models.Score.bulkCreate([
    {guildId: '827597916039016962', userId: '455840886956257287'},
    {guildId: '827597916039016962', userId: '161640664076316994'},
    {guildId: '827597916039016962', userId: '997027454665226734'},
    {guildId: '827597916039016962', userId: '667792375797365060'},
  ]);
}

module.exports = { setupDatabase, insertDummyData };
