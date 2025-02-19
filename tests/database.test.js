const { setupDatabase } = require('../source/database/database.js');

describe('setupDatabase function', () => {
    let sequelize;

    beforeEach(async () => {
        sequelize = await setupDatabase(false);
    });

    afterEach(async () => {
        const force = true;
        await sequelize.sync({force});
    });

    test('sample data all good', async () => {
        const Score = sequelize.models.Score;
        const scores = await Score.findAll();
        expect(scores);
    })

    test('create database if no database found', async () => {
        const force = true;
        // sequelize.sync({force});
    });
    
    // test('pass if database already created', async () => {
        
    // });
})
