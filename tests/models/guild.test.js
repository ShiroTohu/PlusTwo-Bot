const { Guild } = require('../../source/database/database.js');
const { initializeTestDatabase } = require('./testDb.js');

beforeEach(async () => {
  await initializeTestDatabase();
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
