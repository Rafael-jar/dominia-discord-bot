
const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let db = require("quick.db")


module.exports.run = async (bot, message, args) => {
        message.delete();
        let prefix = db.get(`prefix`)
        let hicon = bot.user.displayAvatarURL;
        let HelpEmbed = new Discord.RichEmbed()
                .setTitle(`**Commandes:** `)
                .setThumbnail(hicon)
                .setColor(db.get(`embed`))
                .setDescription(`Prefix: \`${prefix}\``)
                .addField("<:policeman:534295497800941578>Modération", `\`${prefix}ban\`,\`${prefix}kick\`,\`${prefix}tempmute\`, \`${prefix}report\`, \`${prefix}mute \`, \`${prefix}unmute \`, \`${prefix}warn \`, \`${prefix}modlogs \`, \`${prefix}clear \`, \`${prefix}tempban \``)
                .addField("<:support:541621141530345477>Support", `\`${prefix}ticket\`,\`${prefix}close\``)
                .addField("<:pyramid:534295487394873354>Système d'xp", `\`${prefix}rank\`, \`${prefix}leaderboard\``)
                .addField("<:money:534294942705778688>Economie", `\`${prefix}money\`, \`${prefix}pay\`, \`${prefix}setmoney\`, \`${prefix}leaderboard\`, \`${prefix}shop\`, \`${prefix}vol\`, \`${prefix}setfailcrime\`, \`${prefix}setfailvol\`, \`${prefix}setmaxcrime\`, \`${prefix}setmincrime\`, \`${prefix}setminwork\`, \`${prefix}setmaxwork\`, \`${prefix}setmaxvol\`, \`${prefix}setminvol\``)
                .addField('<:settingsgears:538047227894169603>Administration', `\`${prefix}setprefix\`, \`${prefix}setname\`, \`${prefix}setgame\`, \`${prefix}setcolor\`, \`${prefix}setlogs\`, \`${prefix}removerole\`, \`${prefix}deletechannel\`, \`${prefix}deleterole\`, \`${prefix}addrole\`, \`${prefix}createchannel\`, \`${prefix}createrole\``)
                .setFooter(bot.user.username, bot.user.displayAvatarURL)//<:support:541621141530345477>
                .setTimestamp(message.createdAt);
        message.channel.sendMessage(HelpEmbed);

}

module.exports.help = {
        name: "help"
}