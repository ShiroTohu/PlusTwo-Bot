const sequelize = require('../testDatabase.js');

const existingGuildId = '827597916039016962';
const existingUserId = '997027454665226734';

describe('Getter Setter methods', () => {
  test('retrieving guild using getGuild method', async () => {
    const guild = await Guild.getGuild(existingGuildId);
    expect(guild).not.toBeNull();
  });

  test('getting guild that does not exist', async () => {
    expect(Guild.getGuild('123549875487559172')).resolves.toBeNull();
  });

  test('creating a guild using createGuild method', async () => {
    const newGuildId = '912834509182370012';
    await Guild.createGuild(newGuildId);

    const guild = await Guild.getGuild(newGuildId);

    expect(guild).not.toBeNull();
    expect(guild.id).toBe(newGuildId);
    expect(Guild.findOne({where: {id: existingGuildId}})).resolves.not.toBeNull();
  });
});

// TODO: Fix error with this test, for some reason it can't the guildId.
describe('getLeaderboard method', () => {
  test('returned objected from getLeaderboard method matches expected output', async () => {
    const Guild = sequelize.models.Guild;
    const guild = await Guild.getGuild(existingGuildId);

    expect(guild).not.toBeNull();

    const scores = await guild.getLeaderboard();
    expect(scores).not.toBeNull();
    expect(scores.User).not.toBeNull();
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
