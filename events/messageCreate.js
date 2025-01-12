const { Events } = require('discord.js');
const { Users } = require('../dbObjects.js');

async function alterScore(referenceAuthor, delta) {
    const user = await Users.findOne({
        where: {user_id: referenceAuthor.id}
    });

    if (user) {
        return await user.increment('score', { by: delta });
    }
    
    return await Users.create({user_id: referenceAuthor.id, username: referenceAuthor.username, score: delta});
}

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