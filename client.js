const Discord = require('discord.js'); 
const { readdir, readdirSync } = require('fs');
const { join, resolve } = require('path');
const { fail } = require('./utils/emojis.json');

class Client extends Discord.Client {

  /**
   *  @param {object} config
   *  @param {ClientOptions} Options
   */
  
  constructor(config, options = {}) {
    super(options);

    this.logger = require('./utils/logger.js');

    this.types = {
      INFO: 'info',
      FUN: 'fun',
      COLOR: 'color'
    };
    /** all availabel commands */
    this.commands = new Discord.Collection();

    /** commands aliasses */
    this.aliases = new Discord.Collection();

    /** trivia topics */
    this.topics = [];

    this.token = config.token;

    this.apiKeys = config.apiKeys;

    this.ownerID = config.ownerID;

    this.logger.info('Start..');

  }

  loadEvents(path) {
    readdir(path, (err, files) => {
      if (err) this.logger.error(err);
      files = files.filter(file => file.split('.').pop() === 'js');
      if (files.length === 0) return this.logger.error("No events found");
      this.logger.info(`${files.length} events found`);
      files.forEach(file => {
        const eventName = file.split(".")[0];
        const event = require(resolve(__basedir, join(path, file)));
        super.on(eventName, event.bind(null, this));
        delete require.cache[require.resolve(resolve(__basedir, join(path, file)))];
        this.logger.info([`loading event: ${eventName}`]);
      });
    });
    return this;
  }

  loadCommands(path) {
    readdirSync(path).filter(f => !f.endsWith('.js')).forEach(dir => {
      const commandFiles = readdirSync(resolve(__basedir, join(path, dir))).filter(f => f.endsWith('.js'));

      commandFiles.forEach(file => {
        const Command = require(resolve(__basedir, join(path, dir, file)));
        let commandName = file.split(".")[0];
        const cmd = new Command(this);
        if (cmd.name && !cmd.disabled) {
          this.commands.set(cmd.name, cmd);

          let aliases = '';
          if (cmd.aliases) {
            cmd.aliases.forEach(alias => {
              this.aliases.set(alias, cmd);
            });
            aliases = cmd.aliases.join(',');
          }
        } else {
          this.logger.error(
            `${file} failed to load`);
          return;
        }
        this.logger.info(`Loading commands ${commandName}`);
      });
    });

    return this;
  }

  loadTopics(path) {
    readdir(path, (err, files) => {
      if (err) this.logger.error(err);
      files = files.filter(f => f.split('.').pop() === 'yml');
      if (files.length === 0) return this.logger.error("No topics found");
      this.logger.info(`${files.length} topics found`);
      files.forEach(file => {
        const topic = file.split(".")[0];
        this.topics.push(topic);
        this.logger.info(`Loading topic: ${topic}`);
      });

    });
    return this;
  }

  isOwner(user) {
    if (user.id === this.ownerID) return true;
    else return false;
  } 
  
}

module.exports = Client;