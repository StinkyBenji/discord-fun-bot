const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const { oneLine } = require('common-tags');
const prefix = "!";

module.exports = class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      aliases: ['commands', 'h'],
      usage: 'help [command | all]',
      description: oneLine`
        Displays a list of all current commands, sorted by category. 
        Can be used in conjunction with a command for additional information.
        Will only display commands that you have permission to access unless the \`all\` parameter is given.
      `,
      type: client.types.INFO,
      examples: ['!help dog']
    });
  }

  run(message, args) {
    const all = (args[0] === 'all') ? args[0] : '';

    const embed = new MessageEmbed();
    const { INFO, FUN } = message.client.types;
    const command = message.client.commands.get(args[0]) || message.client.aliases.get(args[0]);

    if (command && ( message.client.isOwner(message.member))) {
      embed.setTitle(`command: \` ${command.name} \``)
        .setDescription(command.description)
        .addField('Usage', `\`${command.usage}\``, true)
        .addField('Type', `\`${command.type}\``, true)
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
    
      if (command.aliases) embed.addField('Aliases', command.aliases.map(c => `\`${c}\``).join(' '));
      if (command.examples) embed.addField('Examples', command.examples.map(c => `\`${prefix}${c}\``).join('\n'));
    } else if (args.length > 0 && !all) {
      
      message.channel.send("I cannot find this command");
    } else {

      const commands = {};
      for (const type of Object.values(message.client.types)) {
        commands[type] = [];
      }
        
      message.client.commands.forEach(command => {
        commands[command.type].push(`\`${command.name}\``);
      });

      embed.setTitle('Wolfie\'s Commands')
        .setDescription(`All Commands: \`${prefix}help all\`` )
        .setTimestamp()
        .setColor('PINK')
        .setFooter(`To get info of each command please type: ${prefix}help [command]`)
      
      for (const type of Object.values(message.client.types)) {
        embed.addField(`Command Type ${type}`, `Available commands: ${commands[type]}`);
      }
    }
    message.channel.send(embed);
  }
};

