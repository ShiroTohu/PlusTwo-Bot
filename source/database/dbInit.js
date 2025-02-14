// responsible for initalizing the database

const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', { 
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database/database.sqlite',
});

// module is ran like a function
const User = require('./models/user.model.js')(sequelize, Sequelize.DataTypes);
const Guild = require('./models/guild.model.js')(sequelize, Sequelize.DataTypes);
const Score = require('./models/score.model.js')(sequelize, Sequelize.DataTypes, Guild, User);

// TODO: commander
const force = process.argv.includes('--force') || process.argv.includes('-f');

// This syncs the models (User, Guild, Score) with the database making sure that everything
// such as rows and columns match up. If a model doesn't exist in the database a table will be
// created for it. 
sequelize.sync({ force });

module.exports = { User, Guild, Score };
