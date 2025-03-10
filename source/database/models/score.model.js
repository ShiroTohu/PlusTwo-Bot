const { Model } = require('sequelize'); 

class Score extends Model {
    // TODO
    async plusTwo() {
        return await this.increment('score', {
            by: 2,
            where: {
                GuildId: this.GuildId,
                UserId: this.UserId
            }
        });
    }

    // TODO
    async minusTwo() {
        return await this.decrement('score', {
            by: 2,
            where: {
                GuildId: this.GuildId,
                UserId: this.UserId
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
    return Score.init({
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Score'
    });
};
