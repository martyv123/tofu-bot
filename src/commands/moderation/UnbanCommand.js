const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class UnbanCommand extends BaseCommand {
  constructor() {
    super('unban', 'moderation', []);
  }

  async run(client, message, args) {
    // Check permissions
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to use this command.")

    // Variables
    let reason = args.slice(1).join(" ");
    let userID = args[0]
    
    // Input checking
    if (!reason) reason = "No reason given."
    if (!args[0]) return message.channel.send("You must select a user to unban.")
    if (!isNaN(args[0])) return message.channel.send("The ID of the user is not a number.")

    // Execution
    message.guild.fetchBans().then(async bans => {
      if (bans.size == 0) return message.channel.send("This server does not have any banned users.")
      let bannedUser = bans.find(b => b.user.id == userID);
      if (!bannedUser) return message.channel.send("This user ID is not banned.")

      // Unban user
      try {
        await message.guild.members.unban(bannedUser.user, reason);
        message.channel.send(`Successfully unbanned ${args[0]}`);
      } catch(err) {
        console.log("Could not unban user.")
        console.log(err)
      }
    });
  }
}