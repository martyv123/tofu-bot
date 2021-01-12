const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'moderation', []);
  }

  async run(client, message, args) {
    message.channel.send('Type !commands to see my list of commands.');
  }
}