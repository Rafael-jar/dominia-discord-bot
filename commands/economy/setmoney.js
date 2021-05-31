const Discord = require("discord.js");
const db = require('quick.db')
module.exports.run = async (bot, message, args) => {
    message.delete();
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("<:cancel:534298578311708692>Erreur tu n'as pas les permissions.").then(m => m.delete(5000));
    if(!args[1]) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez inserer un montant valide").then(m => m.delete(5000));
    if(args[1] === isNaN) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez inserer un montant valide.").then(m => m.delete(5000));
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez inserer un utilisateur.").then(m => m.delete(5000));
    db.set(`money__${bUser.id}`, args[1])
    message.channel.send(`<:confirm:534355831982915609>Sa money a été changé vers ${args[1]} avec succès.`)
    bUser.send(`Votre money a été changée vers ${args[1]} par ${message.author.username}`)
}

module.exports.help = {
    name: "setmoney"
}