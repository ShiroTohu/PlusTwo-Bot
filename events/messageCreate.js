const { Events } = require('discord.js');
const { Users } = require('../dbObjects.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        const user = message.author;
        console.log(user)
        const REPLY = 19;
        if (message.type == REPLY) {
            repliedTo = await message.fetchReference();
            switch (message.content) {
                case "+2":
                    await Users.findOne({
                        where: {user_id: user.id}
                    }).plusTwo(user);
                    break;
                case "-2":
                    await Users.findOne({
                        where: {user_id: user.id}
                    }).plusTwo(user);
                    break;
            }
        }
    }
}