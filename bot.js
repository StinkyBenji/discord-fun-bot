const config = require('./config.json');
const Discord = require('discord.js');
const Client = require('./client.js');

global.__basedir = __dirname;

const intents = new Discord.Intents();
intents.add(
  'GUILD_PRESENCES',
  'GUILD_MEMBERS',
  'GUILDS',
  'GUILD_VOICE_STATES',
  'GUILD_MESSAGES',
  'GUILD_MESSAGE_REACTIONS'
);


const client = new Client(config, { ws: { intents: intents, partials: ["MESSAGE", 'CHANNEL', 'REACTION'], restTimeOffset: 0.5 } });

function init() {
  client.loadEvents('./events');
  client.loadCommands('./commands');
  client.loadTopics('./assets');
  client.login(client.token);
}

init();

process.on('unhandledRejection', err => client.logger.error(err));