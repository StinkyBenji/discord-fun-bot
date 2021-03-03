const { MessageEmbed } = require('discord.js');
const { oneLine } = require('common-tags');
const config = require('../config.json');

module.exports = (client, message) => {
  
  if (!message.guild || message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
  if (message.content.indexOf(config.prefix) !== 0) return;
  const commandBody = message.content.slice(config.prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command) || client.aliases.get(command);

  if (!cmd) return;

  try {
    cmd.run(message, args);
  } catch (err) {
    return message.channel.send("Ooops, something is wrong");
  }

};