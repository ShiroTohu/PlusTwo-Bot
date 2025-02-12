const { Guild } = require('../../source/database/dbInit.js');
const { initializeTestDatabase } = require('./testDb.js');

beforeEach(() => {
  initializeTestDatabase();
});

test('Retrieving the leaderboard', () => {
  await Guild.getLeaderboard(guildId);
});

test('Plus two a user', () => {
  await Guild.plusTwo(userId);
});

test('Minus two a user', () => {
  await Guild.minustwo(userId);
});
