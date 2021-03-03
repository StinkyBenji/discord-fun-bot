const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class RollCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'rollthedice',
      aliases: ['dice', 'roll'],
      usage: 'roll <dice sides>',
      description: 'Rolls a dice with the specified number of sides against wolfie. Will default to 6 sides if no number is given.',
      type: client.types.FUN,
      examples: ['roll 10']
    });
  }
  run(message, args) { 
    let sides = args[0];
    if (!sides) sides = 6;

    const userDice = Math.floor(Math.random() * sides + 1);
    const botDice = Math.floor(Math.random() * sides + 1);

    if (sides <= 0)
      message.channel.send("Give me a valid number of dice sides, come on");
    let result;
    if (userDice === botDice) result = "One more time!";
    else if (userDice > botDice) result = `**${message.member.displayName}** wins!`;
    else result = "I won you little loser  🤗";
    const embed = new MessageEmbed()
      .setTitle(`🎲 Roll the dice ${message.member.displayName} vs. Wolfie`)
      .addField('You:', userDice, true)
      .addField('Wolfie:', botDice, true)
      .addField('Result', result, true)
      .setTimestamp()
      .setColor('GREEN');
    message.channel.send(embed);

  }
}