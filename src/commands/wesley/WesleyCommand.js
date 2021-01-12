const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class WesleyCommand extends BaseCommand {
  constructor() {
    super('wesley', 'wesley', []);
  }

  async run(client, message, args) {
    let image_number = Math.floor(Math.random() * 5) + 1;
    let wesley_image = './wesley' + image_number.toString() + '.jpeg'
    message.channel.send('', {files: [wesley_image]})
  }
}