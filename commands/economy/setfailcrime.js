const Discord = require(`discord.js`);

const db = require('quick.db')
const ms = require('parse-ms')
 
module.exports.run = async (bot, message, args, tools) => {
    message.delete();
    let fail = db.get(`failcrime`)
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("<:cancel:534298578311708692>Erreur tu n'as pas les permissions.").then(m => m.delete(5000));
    if(!args[0]) return message.channel.send("<:cancel:534298578311708692>Erreur Vous devez fournir un nombre valide.").then(m => m.delete(5000));
    if(args[0] === isNaN) return message.channel.send("<:cancel:534298578311708692>Erreur Vous devez fournir un nombre valide.").then(m => m.delete(5000));
    db.set(`failcrime`, args[0])
    message.channel.send(`<:confirm:534355831982915609> Vous avez changé le pourcentage de fail avec la commande crime vers ${args[0]} et était à ${fail}`)

}
 
module.exports.help = {
    name: `setfailcrime`
}