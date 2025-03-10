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

  // gets the guilds leaderboard
  async getLeaderboard() {
    return await this.sequelize.models.Score.findAll({
      where: {GuildId: this.id},
      order: [['score', 'DESC']],
      limit: 10,
      include: [this.sequelize.models.User]
    })
  }

  // retrieve user score
  async getScore(userId) {
    // the then statement at the end is so that it doesn't return
    // {score: 12}
    const score = await this.sequelize.models.Score.findOne({
      attributes: ['score'],
      where: {
        GuildId: this.id,
        UserId: userId
      }
    });

    return score.score;
  }

  // adds 2 from the users score
  async plusTwo(userId) {
    return await this.sequelize.models.Score.increment('score', {
      by: 2,
      where: {
        GuildId: this.id,
        UserId: userId
      }
    });
  }

  // subtracts 2 from the users score
  async minusTwo(userId) {
    return await this.sequelize.models.Score.decrement('score', {
      by: 2,
      where: {
        GuildId: this.id,
        UserId: userId
      }
    });
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