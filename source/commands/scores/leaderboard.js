const { SlashCommandBuilder, EmbedBuilder, bold } = require('discord.js');
const { Score, Guild, User } = require('../../database/database.js');
const { logger } = require('../../logger.js');

// TODO: make users into scores

async function getLeaderboard(interaction) {
    logger.info("/leaderboard command used");

    const guild = await Guild.get(guildId);
    logger.info(guild);

    const leaderboardEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setDescription(`The +2 leaderboard for ${interaction.guild.name}!`)
        .setAuthor({ name: `${guild.name} - Leaderboard`, iconURL: guild.iconURL() })
        .setThumbnail(topUser.displayAvatarURL()) 
        .addFields(
            {name: '\u200b', value: leaderboard}
        );

    return leaderboardEmbed
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('get the score a user or a leaderboard of +2\'s'),
	async execute(interaction) {
        const leaderboardEmbed = await getLeaderboard(interaction);
        interaction.reply({ embeds: [leaderboardEmbed] });
	},
};