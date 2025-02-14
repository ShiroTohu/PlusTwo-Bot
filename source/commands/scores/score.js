const { SlashCommandBuilder } = require('discord.js');
const { Users } = require('../../database/database');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('score')
		.setDescription('Get how many plus two\'s you have'),
	async execute(interaction) {
		const score = await Users.findOne({
            attributes: ['score'],
            where: {user_id: interaction.user.id}
        });

        interaction.reply(score);
	},
};
