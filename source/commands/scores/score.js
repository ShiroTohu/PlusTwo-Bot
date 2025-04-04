const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Score } = require('../../database/database.js');
// const { logger } = require('../../logger')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('score')
		.setDescription('Display your score.'),
	async execute(interaction) {
		const score = await Score.findOne({
            attributes: ['score'],
            where: {UserId: interaction.user.id, GuildId: interaction.guildId}
        });

		const leaderboardEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setAuthor({ name: `${interaction.user.username}'s score: ${score.score.toString()}`, iconURL: interaction.user.displayAvatarURL() })
			// .setThumbnail(interaction.user.displayAvatarURL())

        interaction.reply({ embeds: [leaderboardEmbed] });
	},
};
