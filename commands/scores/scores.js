const { SlashCommandBuilder } = require('discord.js');
const { Users } = require('../../dbObjects')

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
		const leaderboard = await Users.findAll({
            attributes: ['username', 'score'],
            limit: 10,
            order: [['score', 'DESC']]
        });

        message = "";

        for (let i = 0; i < leaderboard.length; i++) {
            const user = leaderboard[i];
            message += `${i + 1} ${user.username} ${user.score} \n`;
        }

        interaction.reply(message);
	},
};
