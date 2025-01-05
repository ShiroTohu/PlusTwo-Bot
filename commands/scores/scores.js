const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('score')
		.setDescription('get the score a user or a leaderboard of +2\'s')
        .addSubcommand(subcommand =>
            subcommand
                .setName('all')
                .setDescription('Get the leaderboard')
        )
        .addSubcommand(subcommand => 
            subcommand
                .setName('user')
                .setDescription('Get the specified user\'s score')
                .addUserOption(option => option.setName('target')
                    .setDescription('The user')
                    .setRequired(true)
		        ),
        ),
	async execute(interaction) {
		await interaction.reply('Boom or Doom!');
	},
};
