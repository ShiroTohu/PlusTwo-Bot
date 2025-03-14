const { Model } = require('sequelize');

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
    const score = await this.sequelize.models.Score.findOne({
      attributes: ['score'],
      where: {
        GuildId: this.id,
        UserId: userId
      }
    });

    return score.score;
  }

  /**
   * Adds 2 to the users score within the specified guild.
   * 
   * @param {*} user discord user object
   * @returns {model}}
   */
  async plusTwo(user) {
    const User = this.sequelize.models.User;

    await User.findOrCreate({where: {id: user.id}});
    await this.findOrCreate({where: {id: this.id}});

    return await this.sequelize.models.Score.increment('score', {
      by: 2,
      where: {
        GuildId: this.id,
        UserId: user.id
      }
    });
  }

  // subtracts 2 from the users score. takes in a user object
  async minusTwo(user) {
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
 * A daily value of zero means that they can +2 to their hearts content with no restrictions.
 * 
 * COLUMNS: (GuildId, dailyLimit)
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