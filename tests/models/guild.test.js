const Sequelize = require('sequelize');
const setupTestDatabase = require('../helpers/testDatabase.js');

const existingGuildId = '827597916039016962';
const existingUserId = '997027454665226734';

let sequelize;
let Guild;
beforeAll(async () => {
    sequelize = await setupTestDatabase();
    Guild = sequelize.models.Guild;
});

// for some reason when the tests are finished this raises an error.
// If it aint broke don't fix it... or something like that.
// afterAll(async () => {
//     await sequelize.close();
// });

test('pass if guild model is able to be inserted into database', () => {
    const Guild = require('../../source/database/models/guild.model.js')(sequelize, Sequelize.DataTypes);
    // console.log(sequelize.models.Guild); 
    expect(Guild).toBeTruthy();
    expect(sequelize.models.Guild).toBeTruthy();
});

describe('Getter Setter methods', () => {
    test('retrieving guild using getGuild method', async () => {
        const guild = await Guild.getGuild(existingGuildId);
        expect(guild).toBeTruthy();
    });

    test('getting guild that does not exist', async () => {
        await expect(Guild.getGuild('123549875487559172')).resolves.toBeFalsy();
    });

    test('creating a guild using createGuild method', async () => {
        const newGuildId = '912834509182370012';
        await Guild.createGuild(newGuildId);

        const guild = await Guild.getGuild(newGuildId);

        expect(guild).toBeTruthy();
        expect(guild.id).toBe(newGuildId);
        expect(Guild.findOne({where: {id: existingGuildId}})).resolves.toBeTruthy();
    });
});

// TODO: Fix error with this test, for some reason it can't the guildId.
describe('getLeaderboard method', () => {
    test('returned objected from getLeaderboard method matches expected output', async () => {
        const Guild = sequelize.models.Guild;
        const guild = await Guild.getGuild(existingGuildId);

        expect(guild).toBeTruthy();

        const scores = await guild.getLeaderboard();
        console.log(scores);
        expect(scores).toBeTruthy();
        expect(scores[0].User).toBeTruthy();
    });
});

describe('Guild score functionality', () => {
    test('getScore method', async () => {
        const guild = await Guild.getGuild(existingGuildId);
        expect(guild.getScore(existingUserId)).resolves.toEqual(12);
    })

    test('minus two', async () => {
        const guild = await Guild.getGuild(existingGuildId);
        await guild.minusTwo(existingUserId);
        expect(guild.getScore(existingUserId)).resolves.toEqual(10);
    });

    // This test relies on minus two. This isn't really ideal.
    test('plus two', async () => {
        const guild = await Guild.getGuild(existingGuildId);
        await guild.plusTwo(existingUserId);
        expect(guild.getScore(existingUserId)).resolves.toEqual(12);
    });
});
