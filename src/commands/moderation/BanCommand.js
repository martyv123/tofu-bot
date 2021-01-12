const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', []);
  }

  async run(client, message, args) {
    // Check permissions
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to use this command.")

    // Variables
    let reason = args.slice(1).join(" ");
    const user = message.mentions.members.first();

    // Input checking
    if (!reason) reason = "No reason given."
    if (!args[0]) return message.channel.send("You must select a user to ban.")
    if (!user) return message.channel.send("User was not found.")
    if (!user.bannable) return message.channel.send("User cannot be banned.") 

    // Execution
    const banEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been banned from ${message.guild.name}`)
      .setDescription(`Reason: ${reason}`)
      .setColor("#5708ab")
      .setTimestamp();

    // Send ban message
    try {
      await user.send(banEmbed)
    } catch (err) {
      console.log("Could not send ban message.")
      console.log(err)
    }
    
    // Ban user
    try {
      await user.ban({
        days: 7,
        reason: reason})
      } catch (err) {
        console.log("Could not ban user.")
        console.log(err)
      }
  }
}