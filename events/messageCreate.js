const { Events } = require('discord.js');
const { Users } = require('../dbObjects.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        const REPLY = 19;

        if (message.type == REPLY) {
            repliedTo = await message.fetchReference();
            switch (message.content) {
                case "+2":
                    Users.findOne({
                        where: {user_id: repliedTo.author.id}
                    }).then(res => {
                        res.plusTwo(repliedTo.author);
                    })
                    break;
                case "-2":
                    Users.findOne({
                        where: {user_id: repliedTo.author.id}
                    }).then(res => {
                        res.minusTwo(repliedTo.author);
                    })
                    break;
            }
        }
    }
}