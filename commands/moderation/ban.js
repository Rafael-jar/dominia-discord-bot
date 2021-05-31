const Discord = require("discord.js");



const fs = require("fs");
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
        message.delete();
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("<:cancel:534298578311708692>Erreur tu n'as pas les permissions.").then(m => m.delete(5000));
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!bUser) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser l'utilisateur").then(m => m.delete(5000));
        if (bUser.id === message.author.id) return message.channel.send("<:cancel:534298578311708692>Erreur vous ne pouvez pas vous sanctionner vous même").then(m => m.delete(5000));
        let bReason = args.join(" ").slice(22);
        if (!bReason) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser la raison").then(m => m.delete(5000));
        if (bUser.hasPermission("KICK_MEMBERS")) return message.channel.send("<:cancel:534298578311708692>Erreur cet utilisateur a trop de permissions.").then(m => m.delete(5000));
        message.channel.send(`<:policeman:534295497800941578> **${bUser} à bien été banni ! **`);

        message.guild.member(bUser).ban(bReason);
        bUser.send(`Tu as été banni du discord **${message.guild.name}**, raison: ** ${bReason} **`);

        //let logson = JSON.parse(fs.readFileSync("./channel.json", "utf8"));

                let banEmbed = new Discord.RichEmbed()
                        .setDescription("<:auction:534295030135914506>BAN")
                        .setColor(db.get(`embed`))
                        .addField("<:user:534295017695739905>L'utilisateur banni:", `${bUser}`, true)
                        .addField("<:policeman:534295497800941578>Banni par:", `<@${message.author.id}>`, true)
                        .addField("<:omnichannel:534294956001591299>Channel:", message.channel, true)
                        .addField("<:toolscrosssettingssymbolforinter:534294991120367616>Raison:", bReason, true)
                        .setFooter(bot.user.username)
                        .setTimestamp(message.createdAt);
                        let logsChannel = bot.channels.get(db.get(`logs`))
                        if(!logsChannel) return;

                        logsChannel.send(banEmbed).catch(console.error);



                
        let historique = JSON.parse(fs.readFileSync("./utils/historique.json", "utf8"));
        let idHistorique = JSON.parse(fs.readFileSync("./utils/id.json", "utf8"));

        let hUser = bUser;
        let hRaison = bReason;
        if (!idHistorique[hUser.id]) idHistorique[hUser.id] = {
                total: 0
        }
        if (!historique[hUser.id]) historique[hUser.id] = {}

        historique[hUser.id][idHistorique[hUser.id].total + 1] = {
                type: "1",
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
        name: "ban"
}