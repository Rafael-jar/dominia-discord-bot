const Discord = require("discord.js");

const fs = require("fs");
const ms = require("ms");


const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
        message.delete();
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("<:cancel:534298578311708692>Erreur tu n'as pas les permissions.").then(m => m.delete(5000));
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!kUser) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser l'utilisateur").then(m => m.delete(5000));
        let kReason = args.join(" ").slice(22);
        if (!kReason) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser la raison").then(m => m.delete(5000));
        if (kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("<:cancel:534298578311708692>Erreur cet utilisateur a trop de permissions.").then(m => m.delete(5000));


                let kickEmbed = new Discord.RichEmbed()
                        .setDescription("<:auction:534295030135914506>KICK")
                        .setColor(db.get(`embed`))
                        .addField("<:user:534295017695739905>L'utilisateur kické:", `${kUser}`, true)
                        .addField("<:policeman:534295497800941578>Kické par:", `<@${message.author.id}>`, true)
                        .addField("<:omnichannel:534294956001591299>Channel:", message.channel, true)
                        .addField("<:toolscrosssettingssymbolforinter:534294991120367616>Raison:", kReason, true)
                        .setFooter(bot.user.username)
                        .setTimestamp(message.createdAt);
                        let logsChannel = bot.channels.get(db.get(`logs`))
                        if(!logsChannel) return
                        logsChannel.send(kickEmbed).catch(console.error);


        
        message.channel.send(`<:policeman:534295497800941578> **${kUser} a� bien été kick ! **`);
        message.guild.member(kUser).kick(kReason);
        kUser.send(`Tu as été kick du discord **${message.guild.name}**, raison: ** ${kReason} **`);

        let historique = JSON.parse(fs.readFileSync("./utils/historique.json", "utf8"));
        let idHistorique = JSON.parse(fs.readFileSync("./utils/id.json", "utf8"));

        let hUser = kUser;
        let hRaison = kReason;
        if (!idHistorique[hUser.id]) idHistorique[hUser.id] = {
                total: 0
        }
        if (!historique[hUser.id]) historique[hUser.id] = {}

        historique[hUser.id][idHistorique[hUser.id].total + 1] = {
                type: "3",
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
}

module.exports.help = {
        name: "kick"
}