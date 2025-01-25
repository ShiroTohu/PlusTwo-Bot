/**
 * The guild, stores the settings of the guild which can be changed with ModOptions.
 * 
 * @param {Sequelize} sequelize 
 * @param {DataType} DataTypes 
 * @returns a model
 */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('scores', {
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
        timestamps: false,
    });
};