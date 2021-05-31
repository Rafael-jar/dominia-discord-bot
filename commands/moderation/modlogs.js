const Discord = require("discord.js");
const fs = require("fs");

const db = require('quick.db')


module.exports.run = async (bot, message, args) => {
        message.delete();
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("<:cancel:534298578311708692>Erreur tu n'as pas les permissions.").then(m => m.delete(5000));
        let hUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!hUser) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser l'utilisateur").then(m => m.delete(5000));
        let historique = JSON.parse(fs.readFileSync("./utils/historique.json", "utf8"));
        let type = JSON.parse(fs.readFileSync("./utils/type.json", "utf8"));
        let id = JSON.parse(fs.readFileSync("./utils/id.json", "utf8"));
        let warn = JSON.parse(fs.readFileSync("./utils/warnings.json", "utf8"));

        if (!id[hUser.id]) id[hUser.id] = {
                total: 0
        }

        if (!warn[hUser.id]) warn[hUser.id] = {
                warns: 0
        }

        let wUser = warn[hUser.id].warns;

        let res = historique[hUser.id]

        let number = id[hUser.id].total;
        let embed = new Discord.RichEmbed()
        if (number === 0) {
                message.channel.send("<:cancel:534298578311708692>Erreur Cet utilisateur n'a aucune sanction.").then(m => m.delete(5000));
        } else if (number < 10) {
                embed.setColor(db.get(`embed`));
                embed.setAuthor(hUser.user.username, hUser.user.displayAvatarURL);
                embed.setDescription(`<:policeman:534295497800941578>Sanction(s) de ${hUser} !`);
                embed.addField(`<:auction:534295030135914506>Sanction(s)`, `❱ ${number}`, true)
                embed.addField(`<:warninga:534325273236340737>Avertissement(s)`, `❱ ${wUser}`, true)
                embed.addField(`<:baraz:534325810887131136><:baraz:534325810887131136><:baraz:534325810887131136>`, `Sanctions:`)
                .setFooter(bot.user.username, bot.user.displayAvatarURL)
                .setTimestamp();
                for (i = 1; i < number || i == number; i++) {
                        embed.addField(`<:policeman:534295497800941578> Sanction n°\`${i}\``, `<:auction:534295030135914506>Sanction : \`${type[res[i].type]}\`\n<:toolscrosssettingssymbolforinter:534294991120367616>Raison : \`${res[i].raison}\`\n<:policeman:534295497800941578>Modérateur : \`${res[i].moderator.name}\``, true)
                }
                message.author.send(embed);
        }
}

module.exports.help = {
        name: "modlogs"
}