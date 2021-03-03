const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class YesNoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'yesorno',
      aliases: ['yn', 'yesno'],
      usage: 'yesorno',
      description: 'Fetches a gif of a yes or a no.',
      type: client.types.FUN
    });
  }

  async run(message) {
    try {
      const res = await fetch('http://yesno.wtf/api/');
      const data = await res.json();
      let answer = data.answer;
      if (answer === 'yes') answer = '👍  ' + answer + '! ';
      else if (answer === 'no') answer = '👎  ' + answer + '! ';
      else answer = '???  ' + answer;
      
      const img = data.image;
      const embed = new MessageEmbed()
        .setTitle(answer)
        .setImage(img)
        .setTimestamp()
        .setColor('RANDOM');
      
      message.channel.send(embed);
    } catch (err) {
      message.client.logger.error(err.stack);
      this.sendErrorMessage(message, 1, 'Please try again in a few seconds', err.message);
    }
    
  }
}