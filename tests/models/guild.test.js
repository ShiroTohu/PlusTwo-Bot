const { Guild } = require('../../source/database/database.js');
const { setupDatabase } = require('../../source/database/database.js');

beforeEach(async () => {
  await setupDatabase();
});

test('Retrieving the leaderboard', async () => {
  await Guild.getLeaderboard(guildId);
});

test('Plus two a user', async () => {
  await Guild.plusTwo(userId);
});

test('Minus two a user', async () => {
  await Guild.minustwo(userId);
});
