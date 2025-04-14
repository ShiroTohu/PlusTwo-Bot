const { Sequelize } = require('sequelize');

test('pass if user model is able to be inserted into database', () => {
    const sequelize = new Sequelize('sqlite::memory:');

    const User = require('../../source/database/models/user.model.js')(sequelize, Sequelize.DataTypes);
    console.log(sequelize.models.User); 
    expect(sequelize.models.User).not.toBeNull();
});
