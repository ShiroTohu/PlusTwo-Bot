const { Model } = require('sequelize'); 

class Score extends Model { }

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
