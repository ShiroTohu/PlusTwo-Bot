const { Sequelize, DataTypes } = require('sequelize');

// tests if it's a Sequelize issue or a testing issue. If this test doesn't pass it is 
// most likely a Sequelize issue.
test('test database in general', async () => {
    const sequelize = new Sequelize('sqlite::memory:');
    
    expect(sequelize).not.toBeNull();
    
    const User = sequelize.define(
    'User',
    {
        // Model attributes are defined here
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            // allowNull defaults to true
        },
    },
    {
        // Other model options go here
    });

    await sequelize.sync();
    await User.create({ firstName: 'Jane', lastName: 'Doe' });
});
