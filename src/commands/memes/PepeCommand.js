const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PepeCommand extends BaseCommand {
  constructor() {
    super('pepe', 'memes', []);
  }

  run(client, message, args) {
    message.channel.send('', {files: ['./pepe.jpg']});
  }
}