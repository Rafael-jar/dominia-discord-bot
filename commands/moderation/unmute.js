const Discord = require("discord.js");

const fs = require("fs");


const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
        message.delete();
        if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("<:cancel:534298578311708692>Erreur tu n'as pas les permissions.").then(m => m.delete(5000));
        let uMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if (!uMember) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser l'utilisateur").then(m => m.delete(5000));
        let uRole = message.guild.roles.find(`name`, "Muted");
        let mReason = args.join(" ").slice(22);
        if (!mReason) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser la raison").then(m => m.delete(5000));

        if (!uMember.roles.has(uRole.id)) return message.channel.send("<:cancel:534298578311708692>Erreur cet utilisateur n'est pas mute").then(m => m.delete(5000));
        await (uMember.removeRole(uRole.id));

        uMember.send(`Tu as été unmute du discord **${message.guild.name}** par **<@${message.author.id}>**`);
        message.channel.send(`**<:policeman:534295497800941578><@${uMember.id}> a été unmute par <@${message.author.id}>**`);



                let unmuteEmbed = new Discord.RichEmbed()
                        .setDescription("<:auction:534295030135914506>UNMUTE")
                        .setColor(db.get(`embed`))
                        .addField("<:user:534295017695739905>L'utilisateur unmute", `${uMember}`, true)
                        .addField("<:policeman:534295497800941578>Unmute par", `<@${message.author.id}>`, true)
                        .addField("<:omnichannel:534294956001591299>Channel", message.channel, true)
                        .addField("<:toolscrosssettingssymbolforinter:534294991120367616>Raison", mReason, true)
                        .setFooter(bot.user.username)
                        .setTimestamp(message.createdAt);
                        let logsChannel = bot.channels.get(db.get(`logs`))
                        if (!logsChannel) return
                        logsChannel.send(unmuteEmbed).catch(console.error);
                        

        

}

module.exports.help = {
        name: "unmute"
}