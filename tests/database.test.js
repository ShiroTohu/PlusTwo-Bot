const sequelize = require('./testDatabase.js');
const { Sequelize, DataTypes } = require('sequelize')
// const existingGuildId = '827597916039016962';
// const existingUserId = '997027454665226734';

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

describe('setupDatabase and insertDummyData functions', () => {
    // make sure that something didn't go wrong when inserting data.
    test('pass if data in database', async () => {
        await expect(sequelize).resolves.not.toBeNull();

        await expect(sequelize.models.User.findAll()).resolves.not.toBeNull();
        await expect(sequelize.models.Guild.findAll()).resolves.not.toBeNull();
        await expect(sequelize.models.Score.findAll()).resolves.not.toBeNull();
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
        console.log(user.Scores[0].score);
    })
});
