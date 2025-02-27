const { setupDatabase, insertDummyData } = require('../source/database/database.js');

describe('setupDatabase and insertDummyData functions', () => {
    let sequelize;

    beforeAll(async () => {
        sequelize = await setupDatabase();
        console.log(sequelize.models.User);
        await insertDummyData(sequelize);
    });

    afterAll(async () => {
        await sequelize.sync({force: true});
    });

    test('pass if data in database', async () => {
        await expect(sequelize.models.User.findAll()).resolves.not.toBeNull();
        await expect(sequelize.models.Guild.findAll()).resolves.not.toBeNull();
        await expect(sequelize.models.Score.findAll()).resolves.not.toBeNull();
    });
});
