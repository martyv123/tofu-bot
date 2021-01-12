const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class NicknameCommand extends BaseCommand {
  constructor() {
    super('nickname', 'moderation', []);
  }

  async run(client, message, args) {
    // Permissions
    if(!message.member.hasPermission("CHANGE_NICKNAME")) return message.channel.send("You do not have permission to use this command.")
    if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("I require permission to change nicknames.")

    // Variables
    const user = message.mentions.members.first()
    const nickname = args.slice(1).join(" ")

    // Input checking
    if (!args[0]) return message.channel.send("You must select a user to change their nickname.")
    if (!user) return message.channel.send("User not found.")
    if (!nickname) return message.channel.send("You must give a nickname to the user.")
    if (!user.kickable) return message.channel.send("User's nickname cannot be changed.") 

    // Execution
    try {
      await user.setNickname(nickname)
    } catch(err) {
      console.log("Nickname could not be changed.")
      console.log(err)
    }

  }
}