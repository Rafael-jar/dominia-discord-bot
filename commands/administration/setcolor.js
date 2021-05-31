const Discord = require("discord.js");
const db = require('quick.db')
module.exports.run = async (bot, message, args) => {
    message.delete();
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("<:cancel:534298578311708692>Erreur tu n'as pas les permissions.").then(m => m.delete(5000));
    if(!args[0]) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser la couleur")
    db.set(`embed`, args[0])
    message.channel.send("<:confirm:534355831982915609>Couleur changé avec succès.")
}

module.exports.help = {
    name: "setcolor"
}