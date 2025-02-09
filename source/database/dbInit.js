const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database/database.sqlite',
});

// module is ran like a function
const User = require('./models/Users.js')(sequelize, Sequelize.DataTypes);
const Guild = require('./models/Guilds.js')(sequelize, Sequelize.DataTypes);
const Score = require('./models/Scores.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

// you could use sync to insert dummy data into the database as seen in
// https://discordjs.guide/sequelize/currency.html#initialize-database
sequelize.sync({ force });

module.exports = { User, Guild, Score };
