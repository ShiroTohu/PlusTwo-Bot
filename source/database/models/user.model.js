const { Model } = require('sequelize'); 

class User extends Model { }

/**
 * Returns function to initalize user model.
 * 
 * usernames are stored here and not in the Guild. It's because
 * when using the getLeaderboard command it would query discord 10 times to get the
 * username of the highest ranking player.
 * 
 * COLUMNS: (id, username)
 * 
 * @param {*} sequelize 
 * @param {*} DataTypes 
 * @returns 
 */
module.exports = (sequelize, DataTypes) => {
    return User.init({
        id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'User'
    });
};
