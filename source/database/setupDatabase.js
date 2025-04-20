// responsible for initalizing the database
const Sequelize = require('sequelize');
const process = require('node:process');
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

    // testing environment needs to be renewed each time the database is initalized as opposed to a
    // production environment. 
    if (env == "test") {
        await sequelize.sync({force: true});
    } else {
        await sequelize.sync();
    }

    return sequelize;
};

module.exports = setupDatabase;
