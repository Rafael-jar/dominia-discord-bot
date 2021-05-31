const Discord = require("discord.js");

const db = require('quick.db')

module.exports.run = async (bot, message, args, tools) => {
    message.delete();
    let user = message.mentions.users.first() || message.author;
    let balance = await db.fetch(`money__${user.id}`)
    if(balance === null) balance = 0;
    const emba = new Discord.RichEmbed()
        .setDescription(`<:money:534294942705778688> Money of  ${user.username}`)
        .setColor(db.get(`embed`))
        .addField(":moneybag: Balance:", balance + "<:dollarsymbol:534349683020267520>", true)
        .setFooter(bot.user.username)
        .setTimestamp(message.createdAt);
    message.channel.send(emba)
}

module.exports.help = {
    name: "money"
}