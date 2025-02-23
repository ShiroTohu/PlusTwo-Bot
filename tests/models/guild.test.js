const Guild = require('../../source/database/models/guild.model.js');
const { setupDatabase, insertDummyData } = require('../../source/database/database.js');

let sequelize;

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
    const guild = await Guild.getGuild(827597916039016962);

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

// describe('getLeaderboard method', () => {
//   test('returned objected from getLeaderboard method matches expected output', async () => {
//     const guildId = 827597916039017000;

//     const Guild = sequelize.models.Guild;
//     const guild = await Guild.getGuild(guildId);
//     // console.log(guild);

//     const leaderboard = await guild.getLeaderboard();
//     expect(leaderboard)
//   });
// })
