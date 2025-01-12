const { Events } = require('discord.js');
const { alterScore } = require('../dbObjects.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        const REPLY = 19;

        if (message.type == REPLY) {
            const referenceAuthor = await message.fetchReference().then(res => res.author);
            switch (message.content) {
                case "+2":
                    return await alterScore(referenceAuthor, 2);
                case "-2":
                    return await alterScore(referenceAuthor, -2);
            }
        }
    }
}