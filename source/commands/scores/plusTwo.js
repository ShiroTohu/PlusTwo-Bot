const { SlashCommandBuilder } = require('discord.js');
const { Guild, User, Score } = require('../../database/database.js');
// const { logger } = require('../../logger.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('plus2')
		.setDescription('The crowd goes wild!')
		.addUserOption(option => option.setName('target')
			.setDescription('The user')
			.setRequired(true)
		),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
		
		const guild = await Guild.findOrCreate({where: {id: interaction.guildId}});
		await User.findOrCreate({where: {id: target.id, username: target.username}});
		await Score.findOrCreate({where: {UserId: target.id, GuildId: interaction.guildId}});

		if (!(target == interaction.user)) {
			guild[0].plusTwo(target.id);
			interaction.reply(`<:plus2:1325696309671231561> ${target.username}`);
		} else {
			guild[0].minusTwo(target.id);
			interaction.reply(`<:minus2:1325696373903065128> ${target.username}`);
		}
	},
};
