const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const { join } = require('path');

module.exports = class FunFactsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'funfacts',
      aliases: ['ff', 'funfact'],
      usage: 'fun facts',
      description: 'Send a random fun fact.',
      type: client.types.FUN
    });

  }
  async run(message) {
      
    fs.readFile( join(__basedir ,"/assets", "trivia.json"), (err, file) => {
      if (err) return console.log(err);
      const facts = JSON.parse(file);
      const num = (Math.floor((Math.random() * facts.facts.length) + 0));

      const embed = new MessageEmbed()
        .setTitle('Fun Fact')
        .setDescription(facts.facts[num])
        .setColor('PINK')
        .setTimestamp();
      
      message.channel.send(embed);
    });
  
  }





};
