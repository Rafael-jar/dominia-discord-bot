const Discord = require("discord.js");
const fs = require('fs');

const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    message.delete();
    let lUser = message.author
        let xp = db.get(`xp__${message.author.id}`)
        let level = db.get(`level__${message.author.id}`)
        if(xp === null) xp = 0;
        if(level === null) level = 1;


        let lvlEmbede = new Discord.RichEmbed()
                .setAuthor(lUser.displayName, lUser.displayAvatarURL)
                .setColor(db.get(`embed`))
                .addField("<:dice:534340251187937280>Level", level, true)
                .addField("<:xp:534340265331261440>XP", xp, true)
                .setFooter(bot.user.username, bot.user.displayAvatarURL)
                .setTimestamp(message.createdAt);
                message.author.send(lvlEmbede);

        

}

module.exports.help = {
        name: "rank"
}