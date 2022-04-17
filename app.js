const { Client, Permissions, Intents, Collection, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const client = new Client({ intents: new Intents(98303) });
const { owner, prefix } = require("./config.json");
const { readdirSync } = require("fs")
const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Routes } = require('discord-api-types/v9');

client.commands = new Collection()
client.events = new Collection();

var token = "TOKEN İS HERE"

const log = message => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${message}`) };

//command-handler
const commands = [];
const commandFiles = readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

const rest = new REST({ version: '9' }).setToken(token);

client.on("ready", async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );

		    log(`${client.commands.size} Komut yüklendi ve yenilendi!`);
        } catch (error) {
            console.error(error);
        }
    log(`${client.user.username} Başarıyla Aktif Edildi!`);
})

//event-handler
const eventFiles = readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token)