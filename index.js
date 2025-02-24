// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, ActivityType } = require('discord.js');

require('@dotenvx/dotenvx').config();
require('./source/parser.js');
const { logger } = require('./source/logger');

if (!fs.existsSync(path)) {
  logger.fatal('.env file not found');
  process.exit();
}

const { setupDatabase } = require('./source/database/database.js');
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

// command handler
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

// event handler
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

client.login(process.env.DISCORD_TOKEN);
