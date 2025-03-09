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

  // // This syncs the models (User, Guild, Score) with the database making sure that everything
  // // such as rows and columns match up. If a model doesn't exist in the database a table will
  // // be created for it.
  // await sequelize.sync();

  return sequelize;
};

module.exports = setupDatabase;
