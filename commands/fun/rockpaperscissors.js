const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const rps = ['scissors','rock', 'paper'];
const res = ['Scissors :v:','Rock :fist:', 'Paper :raised_hand:'];

module.exports = class RockPaperScissorsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'rockpaperscissors',
      aliases: ['rps'],
      usage: 'rps <rock | paper | scissors>',
      description: 'Play a game of rock–paper–scissors against Wolfie!',
      type: client.types.FUN,
      examples: ['rps rock']
    });
  }
  run(message, args) { 
    let userChoice;
    if (args.length) userChoice = args[0].toLowerCase();
    if (!rps.includes(userChoice))
      message.channel.send("Enter rock, paper or scissors to play");
    else {
      userChoice = rps.indexOf(userChoice);
      const botChoice = Math.floor(Math.random() * 3);
      console.log(botChoice);
    
      let result;
      if (userChoice === botChoice) result = 'Let\'s do it again';
      else if (botChoice > userChoice || botChoice === 0 && userChoice === 2)
        result = 'I won, you little loser  🤪';
      else result = `**${message.member.displayName}** wins!`;
      const embed = new MessageEmbed()
        .setTitle(`${message.member.displayName} vs. Wolfie`)
        .addField('You:', res[userChoice], true)
        .addField('Wolfie:', res[botChoice], true)
        .addField('Result', result, true)
        .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(embed);
    }
  }
}