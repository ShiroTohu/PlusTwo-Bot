const { SlashCommandBuilder, EmbedBuilder, bold } = require('discord.js');
const { Guild } = require('../../database/database.js');
const { logger } = require('../../logger.js');

async function getLeaderboard(interaction) {
    logger.info("/leaderboard command triggered");

    // if (Guild) {
    //     logger.info(Guild.findAll());
    //     const guild = await Guild.getGuild(interaction.guildId);
    //     logger.info(guild);

    //     const leaderboard = await guild.getLeaderboard();
    //     logger.info(guild);
    //     let leaderboardEmbed;
    // }

    const leaderboardEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setDescription(`No leaderboard found for ${interaction.guild.name}. +2 someone to start!`)
    .setAuthor({ name: `${interaction.guild.name} - Leaderboard`, iconURL: interaction.guild.iconURL() })
    // .setThumbnail(topUser.displayAvatarURL()) 

    // else {
    //     leaderboardEmbed = new EmbedBuilder()
    //     .setColor(0x0099FF)
    //     .setDescription(`The +2 leaderboard for ${interaction.guild.name}!`)
    //     .setAuthor({ name: `${interaction.guild.name} - Leaderboard`, iconURL: interaction.guild.iconURL() })
    //     // .setThumbnail(topUser.displayAvatarURL()) 
    //     .addFields(
    //         {name: '\u200b', value: leaderboard}
    //     );
    // }

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