const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class TofuCommand extends BaseCommand {
  constructor() {
    super('tofu', 'tofu', []);
  }

  run(client, message, args) {
    message.channel.send('me tofu');
  }
}