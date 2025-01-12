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
		const user = interaction.options.getUser('target');
		if (!(user == interaction.user)) {
			interaction.reply(`<:plus2:1325696309671231561> ${user.username}`);
			await alterScore(user, 2);
		} else {
			interaction.reply(`<:minus2:1325696373903065128> ${interaction.user.username}`)
			await alterScore(user, -2)
		}
	},
};
