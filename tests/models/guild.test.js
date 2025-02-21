const Guild = require('../../source/database/models/guild.model.js');
const { setupDatabase, insertDummyData } = require('../../source/database/database.js');

describe('test Guild methods', () => {
  let sequelize;

  beforeEach(async () => {
    sequelize = await setupDatabase();
    await insertDummyData(sequelize);
  });

  afterEach(async () => {
    await sequelize.sync({ force: true });
  });

  test('retrieving guild using getGuild method', async () => {
    const Guild = sequelize.models.Guild;
    const guild = await Guild.getGuild(827597916039017000);

    console.log(guild)
    expect(guild).not.toBeNull();

    await sequelize.sync({ force: true });
  });

  test('create a guild', async () => {
    const Guild = sequelize.models.Guild;
    await Guild.createGuild(912834509182370012);

    const guild = await Guild.getGuild(912834509182370012);
    console.log(guild);
    expect(guild)
  })

  // test('the guild model getLeaderboard method exists', async() => {
  //   console.log(sequelize.models.Guild);
  //   const Guild = sequelize.models.Guild;

  //   await Guild.getLeaderboard(1234567890);
  // });
  
  // test('returned objected from getLeaderboard method matches expected output', async () => {
  //   const guildId = 1234567890;

  //   const Guild = sequelize.models.Guild;
  //   const leaderboard = await Guild.getLeaderboard(guildId);

  //   return expect(leaderboard).toMatchObject([
  //     {
  //     'user_id': 1,
  //     'score': 10
  //     },
  //     {
  //       'user_id': 2,
  //       'score': 8
  //     }
  //   ])
  // });
  
  // test('plus two a user', async () => {
  //   const userId = 1234567890;
  //   const Guild = sequelize.models.Guild;

  //   await Guild.plusTwo(userId);
  // });
  
  // test('minus two a user', async () => {
  //   const userId = 1234567890;
  //   const Guild = sequelize.models.Guild;

  //   await Guild.minustwo(userId);
  // });
});