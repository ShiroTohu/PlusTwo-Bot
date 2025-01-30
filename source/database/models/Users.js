const { Model } = require(sequelize); 
const { Score } = require('./Scores')

class User extends Model {
    plusTwo(guildId) {
        this.alterScore(this.user_id, 2);
    }

    minusTwo(guildId) {
        this.alterScore(this.user_id, -2)
    }

    getUsername() {

    }
}

module.exports = (sequelize, DataTypes) => {
    return User.init({
        user_id: {
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
        modelName: 'Score',
    });
};