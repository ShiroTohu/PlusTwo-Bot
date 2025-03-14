const { SlashCommandBuilder, EmbedBuilder, bold } = require('discord.js');
const { Guild } = require('../../database/database.js');
const { logger } = require('../../logger.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('get the score a user or a leaderboard of +2\'s'),
	async execute(interaction) {
        const leaderboardEmbed = await getLeaderboard(interaction);
        interaction.reply({ embeds: [leaderboardEmbed] });
	},
};

async function getLeaderboard(interaction) {
    logger.info("/leaderboard command triggered");

    const guild = await Guild.getGuild(interaction.guildId);
    const scores = await guild.getLeaderboard(); // TODO: should probably rename this to get scores
    const topUser = await interaction.client.users.fetch(scores[0].User.id);

    if (!(scores.length == 0)) {
        let leaderboard = '';
        for (i in scores) {
            const score  =scores[i]
            leaderboard += `**${score.User.username}**: ${score.score} \n`
        }

        return new EmbedBuilder()
        .setColor(0x0099FF)
        .setDescription(`The +2 leaderboard for ${interaction.guild.name}!`)
        .setAuthor({ name: `${interaction.guild.name} - Leaderboard`, iconURL: interaction.guild.iconURL() })
        .setThumbnail(topUser.displayAvatarURL())
        .addFields(
            {name: '\u200b', value: leaderboard}
        );
    } else {
        return new EmbedBuilder()
        .setColor(0x0099FF)
        .setDescription(`No leaderboard found for ${interaction.guild.name}. +2 someone to start!`)
        .setAuthor({ name: `${interaction.guild.name} - Leaderboard`, iconURL: interaction.guild.iconURL() });
    }
}