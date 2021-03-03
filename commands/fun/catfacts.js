const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class CatFactCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'catfacts',
      aliases: ['cf'],
      usage: 'catfacts',
      description: 'send a random cat fact.',
      type: client.types.FUN
    });
  }
  async run(message) {
    try {
      const res = await fetch('https://catfact.ninja/fact');
      const fact = (await res.json()).fact;
      const embed = new MessageEmbed()
        .setTitle('🐱  Cat Fact  🐱')
        .setDescription(fact)
        .setTimestamp()
        .setColor('YELLOW');
      message.channel.send(embed);

    } catch (err)
    {
      message.client.logger.error(err.stack);
      
    }
  }
}