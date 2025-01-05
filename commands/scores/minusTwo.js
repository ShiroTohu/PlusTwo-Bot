const { SlashCommandBuilder } = require('discord.js');
const { db } = require('../../source/database')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('m2')
		.setDescription('the crowd goes home!')
		.addUserOption(option => option.setName('target')
			.setDescription('The user')
			.setRequired(true)
		),
	async execute(interaction) {
		await interaction.reply('That\'s a doom');
	},
};