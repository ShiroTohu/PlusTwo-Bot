const { Events, ActivityType } = require('discord.js');

module.exports = {
    name:Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        client.user.setActivity('https://youtu.be/q2FYfDpEpGc', { type: ActivityType.Watching });
    }
};