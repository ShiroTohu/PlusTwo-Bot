const { REST, Routes } = require('discord.js');
require('@dotenvx/dotenvx').config({path: ['../.env']});

console.log(process.env.DISCORD_TOKEN);
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// for global commands
rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);