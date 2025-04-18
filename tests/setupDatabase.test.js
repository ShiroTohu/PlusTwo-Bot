const setupDatabase = require('../source/database/setupDatabase.js');

test('pass if setupDatabase works', async () => {
    const sequelize = await setupDatabase();
    expect(sequelize).toBeTruthy();
});
