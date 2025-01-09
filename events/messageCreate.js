const { Events } = require('discord.js');
const { Users } = require('../dbObjects.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        const user = message.author;
        const REPLY = 19;
        if (message.type == REPLY) {
            repliedTo = await message.fetchReference();
            switch (message.content) {
                case "+2":
                    await Users.plusTwo(user);
                    break;
                case "-2":
                    await Users.minusTwo(user);
                    break;
            }
        }
    }
}