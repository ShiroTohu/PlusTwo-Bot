const Guild = require('../../source/database/models/guild.model.js');
const { setupDatabase, insertDummyData } = require('../../source/database/database.js');

let sequelize;

// this guild actually exists in the dummy data
const existingGuildId = 827597916039016962;

beforeEach(async () => {
  sequelize = await setupDatabase();
  await insertDummyData(sequelize);
});

afterEach(async () => {
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
    const Guild = sequelize.models.Guild;
    await Guild.createGuild(912834509182370012);

    const guild = await Guild.getGuild(912834509182370012);
    expect(guild).not.toBeNull();
  });
});

describe('getLeaderboard method', () => {
  test('returned objected from getLeaderboard method matches expected output', async () => {

    const Guild = sequelize.models.Guild;
    const guild = await Guild.getGuild(existingGuildId);

    const leaderboard = await guild.getLeaderboard();
    console.log(leaderboard); 
    expect(leaderboard).not.toBeNull();
  });
})
