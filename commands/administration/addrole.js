
const Discord = require("discord.js");
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    message.delete();
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("<:cancel:534298578311708692>Erreur tu n'as pas les permissions.").then(m => m.delete(5000));
    let role = args.join(" ").slice(22);
    let util = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!util) return message.channel.send(`<:cancel:534298578311708692>Erreur Syntaxe: \`.addrole <@utilisateur> <nom du role (:warning: pas d'id.)>\` Pour le nom il ne peut pas y avoir d'espace`)
    if(!role) return message.channel.send(`<:cancel:534298578311708692>Erreur Syntaxe: \`.addrole <@utilisateur> <nom du role (:warning: pas d'id.)>\` Pour le nom il ne peut pas y avoir d'espace`)
    let vrole = message.guild.roles.find(`name`, role);
    if(!vrole) return message.channel.send("<:cancel:534298578311708692>Erreur je ne trouve pas le role.")
    util.addRole(vrole)
    message.author.send(`<:confirm:534355831982915609>Le role a bien été ajouté.`)
}

module.exports.help = {
    name: "addrole"
}