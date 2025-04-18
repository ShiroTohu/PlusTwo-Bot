const setupDatabase = require('../source/database/setupDatabase.js');

test('pass if setupDatabase works', () => {
    const sequelize = setupDatabase();
    expect(sequelize).toBeTruthy();
});
