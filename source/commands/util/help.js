const { SlashCommandBuilder, MessageFlags } = require('discord.js');

const message = `
### +2 Bot Functionality!
Here are some ways you can alter someones score.
 - Reply to someones message with \`+2\` or \`-2\`
 - Use the \`/plustwo\` or \`/minustwo\` commands

Remeber to have fun. By default users can only +2 someone 5 times a day, though can be disabled
with \`/modoptions\`.

**DO NOT TRY TO +2 YOURSELF**
`

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get started shattering hopes and dreams'),
	async execute(interaction) {
		await interaction.reply({
            content: message
        });
	},
};
