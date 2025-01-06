module.exports = (sequelize, DataTypes) => {
    sequelize.define('scores', {
        user_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
    }, {
        timestamps: false,
    });
}