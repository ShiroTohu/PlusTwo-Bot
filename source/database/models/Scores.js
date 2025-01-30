const { Model } = require(sequelize); 

class Score extends Model {
    /**
     * Alters the score of a user in the database given a delta. If the user doesn't
     * exist in the database, the user is created with the delta as the initial value.
     * 
     * @param {User} referenceAuthor discord.js User object.
     * @param {int} delta the delta to alter the score by
     * @returns A User Model
     */
    static async alterScore(userId, guildId, delta) {
        const user = await Users.findOne({
            where: {user_id: userId, guild_id: guildId}
        });

        if (user) {
            return await user.increment('score', { by: delta });
        }
        
        return await Users.create({user_id: referenceAuthor.id, username: referenceAuthor.username, score: delta});
    }

    static getLeaderBoard() {

    }
}

/**
 * The guild, stores the settings of the guild which can be changed with ModOptions.
 * 
 * @param {Sequelize} sequelize 
 * @param {DataType} DataTypes 
 * @returns a model
 */
module.exports = (sequelize, DataTypes) => {
    return Score.init({
        guild_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Score',
    });
};