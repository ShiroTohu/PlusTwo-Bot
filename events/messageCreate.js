const { Events } = require('discord.js');
const { alterScore } = require('../dbObjects.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        const REPLY = 19;

        if (message.type == REPLY) {
            const reference = await message.fetchReference()
            const referenceAuthor = reference.author;

            if (referenceAuthor == message.author) {
                message.react('1325696373903065128');
                return await alterScore(referenceAuthor, -2);
            }

            switch (message.content) {
                case "+2":
                    reference.react('1325696309671231561');
                    return await alterScore(referenceAuthor, 2);
                case "-2":
                    reference.react('1325696373903065128');
                    return await alterScore(referenceAuthor, -2);
            }
        }
    }
}