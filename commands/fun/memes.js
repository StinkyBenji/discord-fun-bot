const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const got = require('got');

module.exports = class MemesCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'memes',
      aliases: ['mm', 'meme'],
      usage: 'memes',
      description: 'Send a random meme.',
      type: client.types.FUN
    });
  }
  async run(message) { 
  const embed = new MessageEmbed();
  const response = await got('https://www.reddit.com/r/memes/.json', {
   responseType: 'json'
  });
  var list = JSON.parse(response.body);
  var post = list.data.children;
  let num = Math.floor(Math.random() * post.length) + 1;
  const permalink = post[num].data.permalink;
  const memeUrl = `https://reddit.com${permalink}`;
  const memeImage = post[num].data.url;
  const memeTitle = post[num].data.title;
  const memeUpvotes = post[num].data.ups;
  const memeNumComments = post[num].data.num_comments;

  embed.setTitle(`${memeTitle}`);
  embed.setURL(`${memeUrl}`);
  embed.setColor('RANDOM');
  embed.setImage(memeImage);
  embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);

  message.channel.send(embed);

    
  }
}
