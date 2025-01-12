const { SlashCommandBuilder } = require('discord.js');
const { alterScore } = require('../../dbObjects.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('plus2')
		.setDescription('The crowd goes wild!')
		.addUserOption(option => option.setName('target')
			.setDescription('The user')
			.setRequired(true)
		),
	async execute(interaction) {
		const user = interaction.options.getUser('user') ?? interaction.user;
		await alterScore(user, 2);
		interaction.reply(`+2 ${user.username}`);
	},
};
