const { Model } = require('sequelize'); 

class Score extends Model { }

/**
 * The guild, stores the settings of the guild which can be changed with ModOptions.
 * 
 * @param {Sequelize} sequelize 
 * @param {DataType} DataTypes 
 * @returns a model
 */
module.exports = (sequelize, DataTypes, Guild, User) => {
    return Score.init({
        guild_id: {
            type: DataTypes.STRING,
            references: {
              model: Guild,
              key: 'guild_id'
            }
        },
        user_id: {
            type: DataTypes.STRING,
            references: {
              model: User,
              key: 'user_id'
            }
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
