const { Events } = require('discord.js');

module.exports = {
    name:Events.ClientReady,
    once: true,
    execute(client) {
        Scores.sync();
        
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);
        client.user.setActivity('https://youtu.be/q2FYfDpEpGc', { type: ActivityType.Watching });
    }
};