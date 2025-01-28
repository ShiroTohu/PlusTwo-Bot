const Sequelize = require('sequelize');
const { logger } = require('../logger.js')

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database/database.sqlite',
});

const Users = require('./models/Users.js')(sequelize, Sequelize.DataTypes);
const Scores = require('./models/Scores.js')(sequelize, Sequelize.DataTypes);
const Guilds = require('./models/Guilds.js')(sequelize, Sequelize.DataTypes);

// defining associations
Users.hasMany(Scores);
Guilds.hasMany(Scores);

Scores.hasOne(Users);
Scores.hasOne(Guilds);

logger.info('DB Models Loaded');

module.exports = { Users, alterScore };