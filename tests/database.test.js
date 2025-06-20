const setupTestDatabase = require('./helpers/testDatabase.js');

// const existingGuildId = '827597916039016962';
// const existingUserId = '997027454665226734';

let sequelize;
beforeAll(async () => {
    sequelize = await setupTestDatabase(); 
});

// afterAll(async() => {
//    await sequelize.close();
// });

describe('setupDatabase and insertDummyData functions', () => {
    // check if the sequelize instance resolved
    test('pass if sequelize resolved', () => {
        expect(sequelize).toBeTruthy(); 
    });

    // make sure that something didn't go wrong when inserting data.
    test('pass if data in database', async () => { 
        await expect(sequelize.models.User.findAll()).resolves.toBeTruthy();
        await expect(sequelize.models.Guild.findAll()).resolves.toBeTruthy();
        await expect(sequelize.models.Score.findAll()).resolves.toBeTruthy();
    });
});

describe('general database functions', () => {
    // https://sequelize.org/docs/v6/core-concepts/assocs/#basics-of-queries-involving-associations
    // makes sure that related tables can access each other.
    test('pass if eager loading is working', async () => {
        const Guild = sequelize.models.Guild;
        const User = sequelize.models.User;

        // console.log(await Guild.findOne({include: User}));
        const guild = await Guild.findOne({include: User});
        const user = await User.findOne({include: Guild});
        expect(guild.Users).not.toBeNull();
        expect(user.Guilds).not.toBeNull();
    });

    test('get user score', async () => {
        const User = sequelize.models.User;
        const Score = sequelize.models.Score;

        const user = await User.findOne({include: Score});
        // console.log(user.Scores[0].score);
    });
});
