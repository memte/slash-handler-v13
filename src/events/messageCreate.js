const { Discord, Permissions, MessageEmbed } = require("discord.js");
const { owner, prefix } = require('../../config.json');
module.exports = {
	name: 'messageCreate',
	execute: async(message) => {
  let client = message.client;
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  }};