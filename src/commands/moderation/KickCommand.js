const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  async run(client, message, args) {

    // Check for permission to kick
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      return message.channel.send("You do not have permission to use this command.")
    }

    const user = message.mentions.members.first();
    // console.log(user)
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given"

    const kickEmbed = new Discord.MessageEmbed()
      .setTitle(`You were kicked from ${message.guild.name}`)
      .setTitle(`Reason: ${reason}`)
      .setColor("#5708ab")
      .setTimestamp()
      .setFooter(client.user.tag, client.user.displayAvatarURL())

    // !kick @user reason

    if (!args[0]) return message.channel.send("You must a state a user to kick.")
    if (!user) return message.channel.send("Member mentioned does not exist.")

    // Send the kick message
    try {
      await user.send(kickEmbed)
    } catch (err) {
      console.log("Unable to message the member.")
      console.log(err)
    }

    // Kick the user
    try {
      await user.kick(reason)
    } catch (err) {
      console.log("Unable to kick the member.")
      console.log(err)
    }
  }
}