const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', []);
  }

  async run(client, message, args) {
    // Permissions
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You do not have permission to use this command.")
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("I require permission to manage roles.")

    // Variables
    const muteRole = message.guild.roles.cache.get('798433802631512085')
    const memberRole = message.guild.roles.cache.get('265256465332305921')
    const user = message.mentions.members.first();
    let reason = args.slice(1).join(" ");

    // Input checking
    if (!reason) reason = "No reason given."
    if (!args[0]) return message.channel.send("You must select a user to mute.");
    if (!user) return message.channel.send("User not found");
    if (user.user.id == message.author.id) return message.channel.send("Stop hitting yourself! You can't mute yourself.");
    if (user.user.id == client.user.id) return message.channel.send("Why are you trying to mute me?!");
    if (user.roles.cache.has(muteRole.id)) return message.channel.send("User is already muted.");
    if (message.member.roles.highest.position <= user.roles.highest.position) return message.channel.send("You can't mute someone with a higher role.")

    // Execution
    const muteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been muted in ${message.guild.name}`)
      .setDescription(`Reason: ${reason}`)
      .setColor("#5708ab")
      .setTimestamp();

    // Send mute message
    try {
      await user.send(muteEmbed);
    } catch (err) {
      console.log("Could not send ban message.")
      console.log(err)
    }

    // Mute
    try {
      await user.roles.add(muteRole.id);
    } catch (err) {
      console.log("Could not mute user.")
      console.log(err)
    }

    // Remove member role
    try {
      await user.roles.remove(memberRole.id);
    } catch (err) {
      console.log("Could not remove member role.")
      console.log(err)
    }
    
  }
}