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

// TODO: commander
const force = process.argv.includes('--force') || process.argv.includes('-f');

// TODO: replace attributes with username and score
// we'll need to do some joins and whatnot to make that happen though...
Reflect.defineProperty(Guild.prototype, 'getLeaderboard', {
  value: async () => {
    const leaderboard = await Score.findAll({
      attributes: ['user_id', 'score'],
      ordrt: [['score', 'DESC']]
    });

    return leaderboard;
  }
});

// This syncs the models (User, Guild, Score) with the database making sure that everything
// such as rows and columns match up. If a model doesn't exist in the database a table will be
// created for it.
}) 
sequelize.sync();

module.exports = { User, Guild, Score };
