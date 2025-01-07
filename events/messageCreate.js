const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        const REPLY = 19;
        if (message.type == REPLY) {
            repliedTo = await message.fetchReference();
            switch (message.content) {
                case "+2":
                    repliedTo.react('1325696309671231561');
                    break;
                case "-2":
                    repliedTo.react('1325696373903065128');
                    break;
            }
        }
    }
}