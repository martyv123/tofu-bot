const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class CommandsCommand extends BaseCommand {
  constructor() {
    super('commands', 'moderation', []);
  }

  async run(client, message, args) {
    message.channel.send("Hi, I'm Tofu! \
    \n\nModerator Commands:\n!ban @user -reason\n!unban @user -reason \nmute @user -reason \nunmute @user -reason \nnickname @user -nickname  \
    \n\nOther Commands: \n!pepe \n!shoehei \n!wesley");
  }
}