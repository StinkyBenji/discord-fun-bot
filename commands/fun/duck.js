const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class DuckCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'duck',
      usage: 'duck',
      description: 'Send a random duck pic.',
      type: client.types.FUN
    });
  }
  async run(message) {
    try {
      const res = await fetch('https://random-d.uk/api/v2/random');
      const img = (await res.json()).url;
      const embed = new MessageEmbed()
        .setTitle('🦆  Quack!  🦆')
        .setImage(img)
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(embed);
    } catch (err) {
      message.client.logger.error(err.stack);
      this.sendErrorMessage(message, 1, 'Please try again in a few seconds', err.message);
    }
  }
};