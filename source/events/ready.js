const { Events, ActivityType } = require('discord.js');
const { logger } = require('../logger')

title = `
     ██╗███████╗██████╗ ███╗   ███╗ █████╗     ██████╗  ██████╗ ████████╗
     ██║██╔════╝██╔══██╗████╗ ████║██╔══██╗    ██╔══██╗██╔═══██╗╚══██╔══╝
     ██║█████╗  ██████╔╝██╔████╔██║███████║    ██████╔╝██║   ██║   ██║   
██   ██║██╔══╝  ██╔══██╗██║╚██╔╝██║██╔══██║    ██╔══██╗██║   ██║   ██║   
╚█████╔╝███████╗██║  ██║██║ ╚═╝ ██║██║  ██║    ██████╔╝╚██████╔╝   ██║   
 ╚════╝ ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝    ╚═════╝  ╚═════╝    ╚═╝   
`

module.exports = {
    name:Events.ClientReady,
    once: true,
    execute(client) {
        console.clear();
        console.log(title);
        logger.info(`Logged in as ${client.user.tag}`);
        client.user.setActivity('https://youtu.be/q2FYfDpEpGc', { type: ActivityType.Watching });
    }
};