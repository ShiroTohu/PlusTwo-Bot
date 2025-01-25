const { Events, ActivityType } = require('discord.js');

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
        console.log(title);
        console.log(`Logged in as ${client.user.tag}`);
        client.user.setActivity('https://youtu.be/q2FYfDpEpGc', { type: ActivityType.Watching });
    }
};