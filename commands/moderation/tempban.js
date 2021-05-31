const Discord = require("discord.js");
const fs = require("fs");
const ms = require('ms');

const db = require('quick.db')

module.exports.run = async (bot, message, args) => {

        message.delete();
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("<:cancel:534298578311708692>Erreur tu n'as pas les permissions.").then(m => m.delete(5000));
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!bUser) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser l'utilisateur").then(m => m.delete(5000));
        if (bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("<:cancel:534298578311708692>Erreur cet utilisateur a trop de permissions.").then(m => m.delete(5000));
        let mutetime = args[1];
        if (!mutetime) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser le temps du ban.").then(m => m.delete(5000));
        let bReason = args[2];
        if (!bReason) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser la raison").then(m => m.delete(5000));

        let tempbanEmbed = new Discord.RichEmbed()
                .setDescription(`<:auction:534295030135914506>TEMPBAN`)
                .setColor(db.get(`embed`))
                .addField("<:user:534295017695739905>Ban", `${bUser}`, true)
                .addField("<:policeman:534295497800941578>Ban par", `<@${message.author.id}>`, true)
                .addField("<:hourglassa:534314391286579201>Ban pendant", ms(ms(mutetime)), true)
                .addField("<:omnichannel:534294956001591299>Channel", message.channel, true)
                .addField("<:toolscrosssettingssymbolforinter:534294991120367616>Raison", bReason, true)
                .setFooter(bot.user.username)
                .setTimestamp(message.createdAt);
        let logsChannel = bot.channels.get(db.get(`logs`))
        if (!logsChannel) return
        logsChannel.send(tempbanEmbed).catch(console.error);      
        bUser.send(`Tu as été ban du discord **${message.guild.name}** pendant **${ms(ms(mutetime))}** !`)
        message.channel.send(`**<:policeman:534295497800941578>  ${bUser.displayName} a été banni !**`);
        message.guild.member(bUser).ban(bReason);
        setTimeout(function () {
                bot.fetchUser(bUser.id).then(id => {
                        message.guild.unban(id).catch(err => {
                                console.log(err)
                        });
                }).catch(() => {
                        console.log(`Je ne trouve pas d'utilisateur avec cet ID : \`${bUser.id}\` `);
                });
        }, ms(mutetime));



        let historique = JSON.parse(fs.readFileSync("./utils/historique.json", "utf8"));
        let idHistorique = JSON.parse(fs.readFileSync("./utils/id.json", "utf8"));

        let hUser = bUser;
        let hRaison = bReason;
        if (!idHistorique[hUser.id]) idHistorique[hUser.id] = {
                total: 0
        }
        if (!historique[hUser.id]) historique[hUser.id] = {}

        historique[hUser.id][idHistorique[hUser.id].total + 1] = {
                type: "2",
                moderator: {
                        id: message.author.id,
                        name: message.author.username
                },
                raison: hRaison,
                date: message.createdAt
        }

        idHistorique[hUser.id].total++;

        fs.writeFile("./utils/historique.json", JSON.stringify(historique), (err) => {
                if (err) console.log(err)
        });
        fs.writeFile("./utils/id.json", JSON.stringify(idHistorique), (err) => {
                if (err) console.log(err)
        });

};


module.exports.help = {
        name: "tempban"
}