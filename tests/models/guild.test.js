const Guild = require('../../source/database/models/guild.model.js');
const { setupDatabase, insertDummyData } = require('../../source/database/database.js');

let sequelize;

// this guild actually exists in the dummy data
const existingGuildId = '827597916039016962';

beforeAll(async () => {
  sequelize = await setupDatabase();
  await insertDummyData(sequelize);
});

afterAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Getter Setter methods', () => {
  test('retrieving guild using getGuild method', async () => {
    const Guild = sequelize.models.Guild;
    const guild = await Guild.getGuild(existingGuildId);

    expect(guild).not.toBeNull();

    await sequelize.sync({ force: true });
  });

  test('creating a guild using createGuild method', async () => {
    const newGuildId = '912834509182370012';
    const Guild = sequelize.models.Guild;
    await Guild.createGuild(newGuildId);

    const guild = await Guild.getGuild(newGuildId);
    // console.log(guild.guildId);
    expect(guild).not.toBeNull();
    expect(guild.guildId).toBe(newGuildId);
  });
});

// TODO: Fix error with this test, for some reason it can't the guildId.
describe('getLeaderboard method', () => {
  test('returned objected from getLeaderboard method matches expected output', async () => {
    const Guild = sequelize.models.Guild;
    const guild = await Guild.getGuild(existingGuildId);

    expect(guild).not.toBeNull();

    const leaderboard = await guild.getLeaderboard();
    console.log(leaderboard); 
    expect(leaderboard).not.toBeNull();
  });
})
