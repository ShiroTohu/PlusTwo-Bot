const { Model } = require('sequelize');

// The Guild Model has some helper methods to make code throughout more readable.
class Guild extends Model {
  static async getLeaderboard(guildId) {
    console.log(guildId);
  }

  async plusTwo(userId) {
    // functionality here
  }

  async minusTwo(userId) {
    // functionality here 
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
    return Guild.init({
        guild_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        daily_limit: {
            type: DataTypes.INTEGER,
            default: 10
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Guild'
    });
};
