// responsible for initalizing the database
const Sequelize = require('sequelize');
const process = require('node:process');
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
    logger.info('creating models');
    const User = require('./models/user.model.js')(sequelize, Sequelize.DataTypes);
    const Guild = require('./models/guild.model.js')(sequelize, Sequelize.DataTypes);
    const Score = require('./models/score.model.js')(sequelize, Sequelize.DataTypes);

    // https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/#the-best-of-both-worlds-the-super-many-to-many-relationship
    User.belongsToMany(Guild, {through: Score});
    Guild.belongsToMany(User, {through: Score});
    User.hasMany(Score);
    Score.belongsTo(User);
    Guild.hasMany(Score);
    Score.belongsTo(Guild);
 
    return sequelize;
};

module.exports = setupDatabase;
