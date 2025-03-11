const { Events, ActivityType } = require('discord.js');
const { logger } = require('../logger')

// runs when the bot is logged into discord.
module.exports = {
    name:Events.ClientReady,
    once: true,
    execute(client) {
        logger.info(`Logged in as ${client.user.tag}`);
        client.user.setActivity('https://youtu.be/q2FYfDpEpGc', { type: ActivityType.Watching });
    }
};