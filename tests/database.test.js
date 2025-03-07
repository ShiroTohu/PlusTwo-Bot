const { setupDatabase, insertDummyData } = require('../source/database/database.js');

describe('setupDatabase and insertDummyData functions', () => {
    const existingGuildId = '827597916039016962';
    let sequelize;
    let Guild;
    let Score; 
    let User;

    beforeAll(async () => {
        sequelize = await setupDatabase();

        Guild = sequelize.models.Guild;
        User = sequelize.models.User;
        Score = sequelize.models.Score;

        // console.log(sequelize.models.User);
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

    // https://sequelize.org/docs/v6/core-concepts/assocs/#basics-of-queries-involving-associations
    // makes sure that related tables can access each other.
    test('pass if eager loading is working', async () => {
        // console.log(await Guild.findOne({include: User}));
        const guild = await Guild.findOne({include: User});
        const user = await User.findOne({include: Guild});
        expect(guild.Users).not.toBeNull();
        expect(user.Guilds).not.toBeNull();
    });

    test('get user score', async () => {
        const user = await User.findOne({include: Score});
        console.log(user.Scores[0].score);
    })
});
