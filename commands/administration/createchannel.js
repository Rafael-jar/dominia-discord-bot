const Discord = require("discord.js");
const db = require('quick.db')
module.exports.run = async (bot, message, args) => {
    message.delete();
    let type = args[0]
    let categorie = args[1]
    let nom = args[2]
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("<:cancel:534298578311708692>Erreur tu n'as pas les permissions.").then(m => m.delete(5000));
    if(!type) return message.channel.send("<:cancel:534298578311708692>Erreur Syntaxe: \`.createchannel <text/voice> <category(id)> <nom du salon(:warning: pas d'espace.)>\`")
    if(!categorie) return message.channel.send("<:cancel:534298578311708692>Erreur Syntaxe: \`.createchannel <text/voice> <category(id)> <nom du salon(:warning: pas d'espace.)>\`")
    if(!nom) return message.channel.send("<:cancel:534298578311708692>Erreur Syntaxe: \`.createchannel <text/voice> <category(id)> <nom du salon(:warning: pas d'espace.)>\`")
    message.guild.createChannel(nom, type).then(c => {
        c.setParent(categorie);
    });


}
module.exports.help = {
    name: "createchannel"
}