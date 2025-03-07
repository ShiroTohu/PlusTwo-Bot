// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, ActivityType } = require('discord.js');
require('@dotenvx/dotenvx').config();
require('./source/parser.js');

// source code imports
const { logger } = require('./source/logger');
const { verifyDotEnv } = require('./source/verify-dotenv.js');
const { setupDatabase } = require('./source/database/database.js');

// logs this cool ASCII art to the terminal. Pretty cool right?
console.clear()
console.log(`
     ██╗███████╗██████╗ ███╗   ███╗ █████╗     ██████╗  ██████╗ ████████╗
     ██║██╔════╝██╔══██╗████╗ ████║██╔══██╗    ██╔══██╗██╔═══██╗╚══██╔══╝
     ██║█████╗  ██████╔╝██╔████╔██║███████║    ██████╔╝██║   ██║   ██║   
██   ██║██╔══╝  ██╔══██╗██║╚██╔╝██║██╔══██║    ██╔══██╗██║   ██║   ██║   
╚█████╔╝███████╗██║  ██║██║ ╚═╝ ██║██║  ██║    ██████╔╝╚██████╔╝   ██║   
 ╚════╝ ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝    ╚═════╝  ╚═════╝    ╚═╝   
`);

/**
	verifies that all of the contents needed inside of .env are present. 
  	It then set's up a sequelize instance with the database config
	specified. If none are specfied it defaults to the development config.
 */
verifyDotEnv();
setupDatabase();

// Create a new client instance
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent
  ] 
});

client.commands = new Collection();

// command handler. These need to be called here because the require statement does not
// work inside of a function. Therefore it is left here unabstracted.
logger.info('configuring commands');
const foldersPath = path.join(__dirname, 'source/commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			logger.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// event handler. Dynamically goes through the events/ folder and 
// parses the event name and execute method into the clients on/once method
logger.info('configuring events');
const eventsPath = path.join(__dirname, 'source/events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// login to discord
client.login(process.env.DISCORD_TOKEN);
