const Command = require('../Command.js');
const { MessageEmbed, MessageCollector } = require('discord.js');
const { join } = require('path');
const fs = require('fs');
const YAML = require('yaml');

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
    let topic = args[0];
    if (!topic) {
      topic = message.client.topics[Math.floor(Math.random() * message.client.topics.length)];
    }

    let totalQuestionNum = args[1];
    if (!totalQuestionNum) {
      totalQuestionNum = 15;
    }

    var start = false;
    var winner = "null";
    var exit = false;
    var paused = false;
    var reload = false;

    var players = [];

    function startTrivia() {
      if (!reload) {
        winner = 'null';
        winnerScore = 0;
        players = [];
      }

      start = true;

    }

    function endTrivia(finished) {
      if (start) {
        if (finished) {
          message.channel.send("Game Over now!");
        }
      }
      start = false;
    }

    function loadQuestion(callback) {
      const questions = YAML.parse(fs.readFileSync(join(__basedir, `assets/${topic}.yml`), 'utf8')).questions;
      
      if (typeof callback === "function") {
        callback(startTrivia);
      }
      return questions;
    }



    const questionEmbed = new MessageEmbed()
      .setTitle('Trivia Quiz')
      .addField('Topic', `${topic} `)
      .setDescription('You have 10 seconds to give the answer ;)')
      .setTimestamp()
      .setColor('RANDOM');

    const answerEmbed = new MessageEmbed()
      .setTitle('Trivia Quiz')
      .setTimestamp()
      .setColor('RANDOM');

    function getQuestion(questions, callback) {
      const question = questions.question;
      questionEmbed.addField('Question', `${question}`);
      
      if (typeof callback === "function") {
        callback();
      }

      return questionEmbed;
    }
    
    function getAnswers(questions, callback) {
      const answers = questions.answers;
      for (let a = 0; a < answers.length; a++) {
          answers[a] = answers[a].trim().toLowerCase().replace(/\.|'|-|\s/g, '');

      }

      if (typeof callback === "function") {
        callback();
      }
      return answers;
    }
    
    
    const questions = loadQuestion();
    
    
      const randNum = Math.floor(Math.random() * questions.length);

      var answers = getAnswers(questions[randNum]);
      const filter = response => {
        return answers.some(answer => answer.toLowerCase() === response.content.toLowerCase())
      };
    
      message.channel.send(getQuestion(questions[randNum])).then(() => {
        message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] }).then(collected => {
          message.channel.send(answerEmbed
            .setDescription(`${collected.first().author} got the correct answer! 😙`)
          )
        }).catch(collected => {
          message.channel.send(answerEmbed
            .setDescription('Looks like nobody got the answer.')
            .addField('Correct answers', answers.join('\n'))
          );
        });
      });
  }
}