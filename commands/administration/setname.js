
const fs = require("fs");
module.exports.run = async (bot, message, args) => {
    message.delete();
    let nom = args.join(" ")
    if(!nom) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser le nom")
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("<:cancel:534298578311708692>Erreur tu n'as pas les permissions.").then(m => m.delete(5000));
    bot.user.setUsername(nom)
    message.channel.send(`<:confirm:534355831982915609>Le nom a été changé avec succès.`)
}


module.exports.help = {
    name: "setname"
}