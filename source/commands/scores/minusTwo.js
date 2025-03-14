const { SlashCommandBuilder } = require('discord.js');
const { alterScore } = '../../database/database.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('minus2')
		.setDescription('The crowd goes home!')
		.addUserOption(option => option.setName('target')
			.setDescription('The user')
			.setRequired(true)
		),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
		
		const guild = await Guild.findOrCreate({where: {id: interaction.guildId}});
		await User.findOrCreate({where: {id: target.id, username: target.username}});
		await Score.findOrCreate({where: {UserId: target.id, GuildId: interaction.guildId}});

		guild[0].minusTwo(target.id);
		interaction.reply(`<:minus2:1325696373903065128> ${user.username}`);
	},
};