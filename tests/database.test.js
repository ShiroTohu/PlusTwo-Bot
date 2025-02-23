const { setupDatabase, insertDummyData } = require('../source/database/database.js');

describe('setupDatabase and insertDummyData functions', () => {
    let sequelize;

    beforeEach(async () => {
        sequelize = await setupDatabase();
        console.log(sequelize.models.User);
        await insertDummyData(sequelize);
    });

    afterEach(async () => {
        await sequelize.sync({force: true});
    });

    test('pass if setup and teardown function are ok', async () => {
        const Score = sequelize.models.Score;
        const scores = await Score.findAll();
        expect(scores).not.toBeNull();
    });
});
