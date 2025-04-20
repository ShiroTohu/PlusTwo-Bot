const setupDatabase = require('./setupDatabase.js');

const sequelize = setupDatabase();

(async () => {
    await sequelize.sync()
})();

const User = sequelize.models.User;
const Guild = sequelize.models.Guild;
const Score = sequelize.models.Score;

module.exports = { User, Guild, Score }
