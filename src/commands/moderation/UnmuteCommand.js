const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('unmute', 'moderation', []);
  }

  async run(client, message, args) {
    // Permissions
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You do not have permission to use this command.")
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("I require permission to manage roles.")

    // Variables
    const muteRole = message.guild.roles.cache.get('798433802631512085')
    const memberRole = message.guild.roles.cache.get('265256465332305921')
    const user = message.mentions.members.first();

    // Input checking
    if (!args[0]) return message.channel.send("You must select a user to unmute.");
    if (!user) return message.channel.send("User not found");
    if (user.roles.cache.has(memberRole.id)) return message.channel.send("User is already unmuted.");

    // Execution
    const unmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been unmuted in ${message.guild.name}`)
      .setDescription('Please reach out to a moderator if you have any questions.')
      .setColor("#5708ab")
      .setTimestamp();

    // Send mute message
    try {
      await user.send(unmuteEmbed);
    } catch (err) {
      console.log("Could not send ban message.")
      console.log(err)
    }

    // Mute
    try {
      await user.roles.add(memberRole.id);
    } catch (err) {
      console.log("Could not unmute user.")
      console.log(err)
    }

    // Remove member role
    try {
      await user.roles.remove(muteRole.id);
    } catch (err) {
      console.log("Could not remove mute role.")
      console.log(err)
    }
    
  }
}