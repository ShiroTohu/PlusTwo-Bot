const { REST, Routes } = require('discord.js');
require('@dotenvx/dotenvx').config({path: ['../.env']});

console.log(process.env.DISCORD_TOKEN);
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// for guild-based commands
rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, 621532080228139019), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);