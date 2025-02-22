const { Model } = require('sequelize'); 
const { Score } = require('./score.model');

class User extends Model { }

// returns a function that initalizes the User Model
module.exports = (sequelize, DataTypes) => {
    return User.init({
        userId: {
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
