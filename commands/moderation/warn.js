const Discord = require("discord.js");



const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./utils/warnings.json", "utf8"));
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {

        //!warn @daeshan <reason>
        message.delete();
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("<:cancel:534298578311708692>Erreur tu n'as pas les permissions.").then(m => m.delete(5000));
        let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
        if (!wUser) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser l'utilisateur").then(m => m.delete(5000));
        if (wUser.hasPermission("ADMINISTRATOR")) return message.channel.send("<:cancel:534298578311708692>Erreur cet utilisateur a trop de permissions.").then(m => m.delete(5000));
        let reason = args.join(" ").slice(22);
        if(!reason) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser la raison").then(m => m.delete(5000));

        if (!warns[wUser.id]) warns[wUser.id] = {
                warns: 0
        };

        warns[wUser.id].warns++;

        fs.writeFile("./utils/warnings.json", JSON.stringify(warns), (err) => {
                if (err) console.log(err)
        });

        message.channel.send(`<:policeman:534295497800941578> <@${wUser.id}> a reçu un warn !`)
        wUser.send(`Tu as reçus un avertissement sur le discord **${message.guild.name}** par **<@${message.author.id}>**, raison: ** ${reason} **`);

                let warnEmbed = new Discord.RichEmbed()
                        .setTitle("<:auction:534295030135914506>WARN")
                        .setAuthor(message.author.username)
                        .setColor(db.get(`embed`))
                        .addField("<:user:534295017695739905>Warn", `<@${wUser.id}>`, true)
                        .addField("<:omnichannel:534294956001591299>Warn dans le channel", message.channel, true)
                        .addField("<:toolscrosssettingssymbolforinter:534294991120367616>Raison", reason, true)
                        .setFooter(bot.user.username)
                        .setTimestamp(message.createdAt);
                        let logsChannel = bot.channels.get(db.get(`logs`))
                        if (!logsChannel) return
                                logsChannel.send(warnEmbed).catch(console.error);
        
                        let historique = JSON.parse(fs.readFileSync("./utils/historique.json", "utf8"));
                        let idHistorique = JSON.parse(fs.readFileSync("./utils/id.json", "utf8"));
                
                        let hUser = wUser;
                        let hRaison = reason;
                        if (!idHistorique[hUser.id]) idHistorique[hUser.id] = {
                                total: 0
                        }
                        if (!historique[hUser.id]) historique[hUser.id] = {}
                
                        historique[hUser.id][idHistorique[hUser.id].total + 1] = {
                                type: "6",
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
        name: "warn"
}