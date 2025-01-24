/**
 * The guild, stores the settings of the guild which can be changed with ModOptions.
 * 
 * @param {Sequelize} sequelize 
 * @param {DataType} DataTypes 
 * @returns a model
 */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('guilds', {
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
        timestamps: false
    });
};