const setupDatabase = require('../source/database/setupDatabase.js');
const insertDummyData = require('./helpers/insertDummyData.js');

test('pass if insertDummyData works', async () => {
    const sequelize = setupDatabase();
    await sequelize.sync();
    await insertDummyData(sequelize);

    await expect(sequelize.models.Score.findAll()).resolves.toBeTruthy();
});
