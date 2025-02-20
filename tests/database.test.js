const { setupDatabase, insertDummyData } = require('../source/database/database.js');

// test('dummy data', async () => {
//     sequelize = await setupDatabase();
//     await insertDummyData(sequelize);
//     const users = sequelize.models.Users.findAll();

//     await sequelize.sync({force: true});
// })

describe('setupDatabase function', () => {
    let sequelize;

    beforeEach(async () => {
        sequelize = await setupDatabase();
        await insertDummyData(sequelize);
    });

    afterEach(async () => {
        await sequelize.sync({force: true});
    });

    test('sample data all good', async () => {
        const Score = sequelize.models.Score;
        const scores = await Score.findAll();
        expect(scores).not.toBeNull();
    });

    // test('create database if no database found', async () => {
    //     const force = true;
    //     // sequelize.sync({force});
    // });
    
    // test('pass if database already created', async () => {
        
    // });
});
