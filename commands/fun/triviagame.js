const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const { join } = require('path');

module.exports = class TriviaCommand extends Command { 

    constructor(client) {
    super(client, {
      name: 'triviagame',
      aliases: ['triv', 'quiz'],
      usage: 'trivia [topic] [question number]',
      description: 'A trivia quiz game with your friends.\n Available topics are: Animes, HarryPotter, LeagueOfLegend, LordOfTheRings, VideoGames. If not specify a topic, then the topic will be randomly chosen. \n you can specify questions number for one round, if not, the default number is 15.',
      type: client.types.FUN,
      examples: ['!trivia LeagueOfLegend 20']
    });
  }
  async run(message, args) {
    let topic = args[0];
    if (!topic) {
      topic = client.topics[Math.floor(Math.random() * client.topics.length)];
    }

    let totalQuestionNum = args[1];
    if (!totalQuestionNum) {
      totalQuestionNum = 15;
    }
    var winner = "null";
    var players = [];
    var reload = false;
    var start = false;


    
  }

}
