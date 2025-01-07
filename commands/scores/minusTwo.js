const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('minus2')
		.setDescription('The crowd goes home!')
		.addUserOption(option => option.setName('target')
			.setDescription('The user')
			.setRequired(true)
		),
	async execute(interaction) {
		const user = interaction.options.getUser('user') ?? interaction.user;
		await Users.minusTwo(user);
	},
};