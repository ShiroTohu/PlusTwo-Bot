const { User } = require('discord.js');
const { Model } = require('sequelize');

// The Guild Model has some helper methods to make code throughout more readable.
class Guild extends Model {
  static async getGuild(id) {
    return await this.findOne({
      where: {
        id: id
      }
    });
  }

  static async createGuild(id) {
    return await this.create({
      id: id
    });
  }

  async getLeaderboard() {
    // readability
    const User = Guild.sequelize.models.User;
    const Score = Guild.sequelize.models.Score;

    return await Score.findAll({
      where: {GuildId: this.id},
      order: [['score', 'DESC']],
      limit: 10,
      include: [User]
    })
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
        id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        dailyLimit: {
            type: DataTypes.INTEGER,
            defaultValue: 10
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Guild'
    });
};
