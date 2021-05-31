const Discord = require("discord.js");
const utils = require('../utils/utils.js')
const mysql = require('mysql')

module.exports.run = async (bot, message, args) => {
    message.delete()
    if (!message.guild.member(message.author).hasPermission("MANAGE_CHANNELS")) return utils.noPerms(message, "MANAGE_CHANNELS");
//mets le bdd
    if(!args[0]) {
        bdd.query(`SELECT * FROM \`lock\`  where id = '${message.channel.id}'`, (err, rows2) => {
            if(!rows2[0]) {
                console.log('je passe')
                message.channel.send('<:confirm:566988762848952321>Ce salon sera donc bloqué lors d\'un lock all.')
                bdd.query(`INSERT INTO \`lock\`  (id, status) VALUES('${message.channel.id}', 0)`)
            } else {
                console.log('je pass')
                message.channel.send('<:confirm:566988762848952321>Ce salon ne sera donc pas bloqué lors d\'un lock all.')
                bdd.query(`DELETE FROM \`lock\`  WHERE id = '${message.channel.id}'`)
            }
            console.log('je pas')
        })
    } else {
        salon = message.guild.channels.find(ch => ch.name === args[0])
        if(!salon) return utils.errorPerso(message, "Le salon est invalide ! Assurez-vous de fournir un nom de salon valide sans le `#`");
    }
}

module.exports.help = {
    name: "channellock",
    category: "Moderation",
    info: {
            description: "Permet de set unh salon qui sera bloqué lors d'un lock all.",
            usage: "<nom-du-salon> | .channellock"
    }
}