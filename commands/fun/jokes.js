const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const got = require('got');


module.exports = class JokeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'jokes',
      aliases: ['jk', 'joke'],
      usage: 'jokes',
      description: 'Send a random joke',
      type: client.types.FUN
    });
  }
  async run(message, args) {
    const rapidApiKey = message.client.apiKeys.rapidApi;
    const term = args[0];
    const res = await got("https://dad-jokes.p.rapidapi.com/random/joke", { headers: { "x-rapidapi-key": rapidApiKey, "x-rapidapi-host": "dad-jokes.p.rapidapi.com", "useQueryString": true } });
    const data = JSON.parse(res.body);
    const content = data.body[0];
    const type = content.type;
    const setup = content.setup;
    const punchline = content.punchline;
    const embed = new MessageEmbed()
      .setTitle('Random Joke')
      .setColor('RANDOM')
      .setTimestamp()
      .addField("?", setup)
      .addField("!", punchline)
      .addField("type", type);
    message.channel.send(embed);
  }
}