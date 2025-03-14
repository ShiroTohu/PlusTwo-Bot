const { Events } = require('discord.js');
const { Guild, User, Score } = require('../database/database');
const { logger } = require('../logger');

// When a message is created it checks whether the type of the message is a reply.
// It also checks whether the content is +2/-2 and alaters the score accordingly.
module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        const REPLY = 19;

        if (message.type == REPLY) {
            const reference = await message.fetchReference();
            const referenceAuthor = reference.author;
            
            const guild = await Guild.findOrCreate({where: {id: message.guildId}});
		    await User.findOrCreate({where: {id: referenceAuthor.id, username: referenceAuthor.username}});
		    await Score.findOrCreate({where: {UserId: referenceAuthor.id, GuildId: message.guildId}});

            if (referenceAuthor == message.author) {
                await guild[0].minusTwo(referenceAuthor.id);
                message.react('1325696373903065128');
                return;
            }

            switch (message.content) {
                case "+2":
                    await guild[0].plusTwo(referenceAuthor.id);
                    reference.react('1325696309671231561');
                    return;
                case "-2":
                    await guild[0].minusTwo(referenceAuthor.id);
                    reference.react('1325696373903065128');
                    return;
            }
        }
    }
}