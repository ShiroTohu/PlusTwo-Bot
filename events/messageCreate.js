const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        const REPLY = 19;
        if (message.type == REPLY) {
            repliedTo = await message.fetchReference();
            if (message.content === "+2" | message.content === "-2") {
                message.react('1325312547662073906');
            }
        }
    }
}