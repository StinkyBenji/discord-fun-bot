const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class CatCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'cat',
      aliases: ['kitty', 'kitten', 'meow'],
      usage: 'cat',
      description: 'Send a random cat image.',
      type: client.types.FUN
    });
  }
  async run(message) {
    const apiKey = message.client.apiKeys.catApi;
    try {
      const res = await fetch('https://api.thecatapi.com/v1/images/search', { headers: { 'x-api-key': apiKey } });
      const img = (await res.json())[0].url;
      const embed = new MessageEmbed()
        .setTitle('🐱  Meow!')
        .setImage(img)
        .setTimestamp()
        .setColor('RANDOM');
      message.channel.send(embed);

    } catch (err) {
      console.error(err);
      message.channel.send("Oops, something went wrong..");
      
    }


  }
}