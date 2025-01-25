const { SlashCommandBuilder, EmbedBuilder, bold } = require('discord.js');
const { Scores } = require('../../dbObjects');
const { logger } = require('../../logger.js');

async function createLeaderboard(interaction) {
    logger.info('hello world')
    const users = await Scores.findAll({
        where: {
            guild_id: interaction.guild.id
        },
        limit: 10,
        order: [['score', 'DESC']]
    });

    const guild = interaction.guild;
    const topUser = await interaction.client.users.fetch(users[0].user_id);

    leaderboard = '';

    if (users) {
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            leaderboard += `${i + 1}. ${user.username} - ${user.score} \n`;
        }

    } else {
        leaderboard = 'No one is on the leaderboard. +2 someone to start!'
    }

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
        const leaderboardEmbed = await createLeaderboard(interaction); 
        interaction.reply({ embeds: [leaderboardEmbed] });
	},
};