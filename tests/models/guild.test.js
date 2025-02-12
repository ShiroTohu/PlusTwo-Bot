const { Guild } = require('../../source/database/dbInit.js');

test('Get the leaderboard table from guildId', () => {
    Guild.getLeaderboard(guildId);
}
