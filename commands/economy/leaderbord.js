const Discord = require("discord.js");

const db = require('quick.db')
let prefix = db.get(`prefix`)

module.exports.run = async (bot, message, args, tools) => {
    message.delete();
    if(!args[0]) {
        message.channel.send(`<:cancel:534298578311708692>Erreur Syntaxe:\`${prefix}leaderboard <xp/money>\``)
    }
    if(args[0] === "money") {
    let element = db.startsWith(`money__`, { sort: '.data'})

        element.length = 15;
        const embed = new Discord.RichEmbed
            embed.setTitle("<:gates:540225865783574528>Leaderboard")
            embed.setColor(db.get(`embed`))           
            embed.setFooter(bot.user.username)
            embed.setTimestamp(message.createdAt);

        for (var i in element) {
            let id = element[i].ID.replace(`money__`, "")
            let datap = element[i].data
            embed.addField(`${bot.users.get(id).username}`, `${datap}<:dollarsymbol:534349683020267520>`, true)
        }

        message.channel.send(embed)
    } else if(args[0] === "xp") {
        let element = db.startsWith(`xp__`, { sort: '.data'})

        element.length = 15;
        const embeda = new Discord.RichEmbed
            embeda.setTitle("<:gates:540225865783574528>Leaderboard")
            embeda.setColor(db.get(`embed`))           
            embeda.setFooter(bot.user.username)
            embeda.setTimestamp(message.createdAt);

        for (var i in element) {
            let id = element[i].ID.replace(`xp__`, "")
            let datap = element[i].data
            let level = db.get(`level__${id}`)
            let us = bot.users.get(id).username
            if(!us) us = `Cet utilisateur a quitté le discord son id: ${id}`;
            embeda.addField(`${bot.users.get(id).username}`, `xp:${datap} level:${level}`, true)
        }
        message.channel.send(embeda)

    }
}

module.exports.help = {
    name: "leaderboard"
}