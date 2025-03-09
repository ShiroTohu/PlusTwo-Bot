const setupDatabase = require('./../../source/database/database.js');
const insertDummyData = require('./../insertDummyData.js');

const existingGuildId = '827597916039016962';
const existingUserId = '997027454665226734'

let sequelize;

beforeAll(async () => {
    sequelize = await setupDatabase();
    await sequelize.sync({force: true});

    // console.log(sequelize.models.User);
    await insertDummyData(sequelize);
});

describe('Getter Setter methods', () => {
  test('retrieving guild using getGuild method', async () => {
    const Guild = sequelize.models.Guild;
    const guild = await Guild.getGuild(existingGuildId);

    // console.log(await Guild.findAll({}));

    expect(guild).not.toBeNull();
  });

  test('creating a guild using createGuild method', async () => {
    const newGuildId = '912834509182370012';
    const Guild = sequelize.models.Guild;
    // console.log(await Guild.findOne({where: {id: existingGuildId}}));
    await Guild.createGuild(newGuildId);

    const guild = await Guild.getGuild(newGuildId);

    // console.log(guild.guildId);
    expect(guild).not.toBeNull();
    expect(guild.id).toBe(newGuildId);
    expect(Guild.findOne({where: {id: existingGuildId}})).resolves.not.toBeNull();
  });
});

// TODO: Fix error with this test, for some reason it can't the guildId.
describe('getLeaderboard method', () => {
  test('returned objected from getLeaderboard method matches expected output', async () => {
    const Guild = sequelize.models.Guild;
    const Score = sequelize.models.Score;
    const guild = await Guild.getGuild(existingGuildId);

    // console.log('guild');
    // console.log(await Score.findAll({}));

    expect(guild).not.toBeNull();

    const scores = await guild.getLeaderboard();
    // console.log(scores);
    expect(scores).not.toBeNull();
    expect(scores.User).not.toBeNull();
  });
});

describe('Guild score functionality', () => {
  test('getScore method', async () => {
    const Guild = sequelize.models.Guild;

    const guild = await Guild.getGuild(existingGuildId);
    expect(guild.getScore(existingUserId)).resolves.toEqual(12);
  })

  test('minus two', async () => {
    const Guild = sequelize.models.Guild;
    const guild = await Guild.getGuild(existingGuildId);
    
    const answer = await guild.minusTwo(existingUserId);
    expect(guild.getScore(existingUserId)).resolves.toEqual(10);
  });

  test('plus two', async () => {
    const Guild = sequelize.models.Guild;
    const guild = await Guild.getGuild(existingGuildId);
    
    await guild.plusTwo(existingUserId);
    expect(guild.getScore(existingUserId)).resolves.toEqual(12);
  });
});