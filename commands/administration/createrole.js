
const Discord = require("discord.js");
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    message.delete();
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("<:cancel:534298578311708692>Erreur tu n'as pas les permissions.").then(m => m.delete(5000));
    if(!args[0]) return message.channel.send(`<:cancel:534298578311708692>Erreur Syntaxe: \`.createrole <modo/normal/admin> <couleur(en anglais et en full caps)> <nom du role>\` Pour le nom il ne peut pas y avoir d'espace`)
    if(!args[1]) return message.channel.send(`<:cancel:534298578311708692>Erreur Syntaxe: \`.createrole <modo/normal/admin> <couleur(en anglais et en full caps)> <nom du role)>\` Pour le nom il ne peut pas y avoir d'espace`)
    if(!args[2]) return message.channel.send(`<:cancel:534298578311708692>Erreur Syntaxe: \`.createrole <modo/normal/admin> <couleur(en anglais et en full caps)> <nom du role>\` Pour le nom il ne peut pas y avoir d'espace`)
    let nom = args[2]
    if(args[0] === "admin") {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("<:cancel:534298578311708692>Erreur tu n'as pas les permissions de faire un grade admin.").then(m => m.delete(5000));
        message.guild.createRole({
        name: `${nom}`,
        color: `${args[1]}`,
        mentionable: false,
        permissions: ["ADMINISTRATOR"]
      })

    }
    else if(args[0] == "mod") {
        message.guild.createRole({
            name: `${nom}`,
            color: `${args[1]}`,
            mentionable: false,
            permissions: ["DEAFEN_MEMBERS", "KICK_MEMBERS", "BAN_MEMBERS", "MOVE_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_MESSAGES", "MUTE_MEMBERS", "ADD_REACTIONS", "VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "CONNECT", "SPEAK", "USE_VAD"]
          })


    } else if(args[0] === "normal") {
        message.guild.createRole({
            name: `${nom}`,
            color: `${args[1]}`,
            mentionable: false,
            permissions: ["ADD_REACTIONS", "VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "CONNECT", "SPEAK", "USE_VAD"]
          })

    }
	message.channel.send(`<:confirm:534355831982915609>Role cr��.`)
}

module.exports.help = {
    name: "createrole"
}