const Sequelize = require('sequelize');
const { logger } = require('./logger.js')

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

/**
 * Adds a methods to the User prototype that get's their score from
 * the associated guild.
 */
Reflect.defineProperty(Users.prototype, 'getScore', {
	value: async guildId => {
		const score = await Scores.findOne({
            attributes: ['score'],
			where: { user_id: this.user_id, guild_id: guildId },
		});

		if (score) {
			return score;
		}
	},
});

/**
 * Alters the score of a user in the database given a delta. If the user doesn't
 * exist in the database, the user is created with the delta as the initial value.
 * 
 * @param {User} referenceAuthor discord.js User object.
 * @param {int} delta the delta to alter the score by
 * @returns A User Model
 */
async function alterScore(referenceAuthor, delta) {
    const user = await Users.findOne({
        where: {user_id: referenceAuthor.id}
    });

    if (user) {
        return await user.increment('score', { by: delta });
    }
    
    return await Users.create({user_id: referenceAuthor.id, username: referenceAuthor.username, score: delta});
}

logger.info('DB Models Loaded');

module.exports = { Users, alterScore };