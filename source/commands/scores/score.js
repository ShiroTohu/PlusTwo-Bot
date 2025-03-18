const { SlashCommandBuilder } = require('discord.js');
const { Score } = require('../../database/database');
const { logger } = require('../../logger')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('score')
		.setDescription('Get how many plus two\'s you have'),
	async execute(interaction) {
		const score = await Score.findOne({
            attributes: ['score'],
            where: {UserId: interaction.user.id, GuildId: interaction.guildId}
        });

        interaction.reply(score.score.toString());
	},
};
