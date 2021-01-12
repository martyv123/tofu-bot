const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ShoheiCommand extends BaseCommand {
  constructor() {
    super('shohei', 'shohei', []);
  }

  run(client, message, args) {
    let messages = ['The relentless march of time.', 'Amen.', 'God I love George Strait.', 'Hair is so annoying.', 'Mind if I have a good day?',
                    'Nothing beats real life.', 'We do what we must to survive.', 'Closer by The Chainsmokers is a masterpiece.', 
                    'What now troubadour', 'Sustenance.', 'pspspspspspspspspspspsps', 'Object permanence.', 'We live in a society.']
    let quote_number = Math.floor(Math.random() * messages.length);
    message.channel.send(messages[quote_number]);
  }
}