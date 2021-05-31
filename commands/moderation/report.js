const Discord = require("discord.js");



const fs = require("fs");
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
        message.delete();
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!bUser) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser l'utilisateur").then(m => m.delete(5000));
        if (bUser.id === message.author.id) return message.channel.send("<:cancel:534298578311708692>Erreur vous ne pouvez pas vous report vous même").then(m => m.delete(5000));
        let bReason = args.join(" ").slice(22);
        if (!bReason) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser la raison").then(m => m.delete(5000));
        message.channel.send(`<:policeman:534295497800941578> **${bUser} à bien été report ! **`).then(m => m.delete(5000));

                let banEmbed = new Discord.RichEmbed()
                        .setDescription("<:auction:534295030135914506>REPORT")
                        .setColor(db.get(`embed`))
                        .addField("<:user:534295017695739905>L'utilisateur Report:", `${bUser}`, true)
                        .addField("<:policeman:534295497800941578>Report par:", `<@${message.author.id}>`, true)
                        .addField("<:omnichannel:534294956001591299>Channel:", message.channel, true)
                        .addField("<:toolscrosssettingssymbolforinter:534294991120367616>Raison:", bReason, true)
                        .setFooter(bot.user.username)
                        .setTimestamp(message.createdAt);
                        let logsChannel = bot.channels.get(db.get(`logs`))
                if (!logsChannel) return

                        logsChannel.send(banEmbed).catch(console.error);
                




}

module.exports.help = {
        name: "report"
}