const Discord = require("discord.js");
const db = require('quick.db')
module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("<:cancel:534298578311708692>Erreur tu n'as pas les permissions.").then(m => m.delete(5000));
    db.set('logs', message.channel.id);
    message.channel.send(`<:confirm:534355831982915609>Logs changé avec succès sur le salon \`${message.channel.name}\``)
}

module.exports.help = {
    name: "setlogs"
}