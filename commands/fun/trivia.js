const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class TriviaCommand extends Command { 

    constructor(client) {
    super(client, {
      name: 'trivia',
      aliases: ['triv', 'quiz'],
      usage: 'trivia [topic] [question number]',
      description: 'A trivia quiz game with your friends.\n Available topics are: Animes, HarryPotter, LeagueOfLegend, LordOfTheRings, VideoGames. If not specify a topic, then the topic will be randomly chosen. \n you can specify questions number for one round, if not, the default number is 15.',
      type: client.types.FUN,
      examples: ['!trivia LeagueOfLegend 20']
    });
  }
  async run(message, args) {
    
  }

}
