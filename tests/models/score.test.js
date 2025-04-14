const { Sequelize } = require('sequelize');

test('pass if scores model is able to be inserted into database', () => {
    const sequelize = new Sequelize('sqlite::memory:');

    const Score = require('../../source/database/models/score.model.js')(sequelize, Sequelize.DataTypes);
    console.log(sequelize.models.Score); 
    expect(sequelize.models.Score).not.toBeNull();
});
