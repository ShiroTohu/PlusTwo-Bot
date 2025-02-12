const { Sequelize } = require('Sequelize');


function initalizeTestDatabase() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
  }

  const User = require('../../source/database/models/Users.js')(sequelize, Sequelize.DataTypes);
  const Score = require('../../source/database/models/Scores.js')(sequelize, Sequelize.DataTypes);
  const Guild = require('../../source/database/model/Scores.js')(sequelize, Sequelize.DataTypes);

  Guild.belongsToMany(User, {through: 'Scores'});
  User.belongsToMany(Guild, {through: 'Scores'});

  await sequelize.sync();
}
