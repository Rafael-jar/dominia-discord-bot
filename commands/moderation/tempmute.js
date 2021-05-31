const Discord = require("discord.js");

const fs = require("fs");
const ms = require("ms");


const db = require('quick.db')

module.exports.run = async (bot, message, args) => {

        message.delete();
        if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("<:cancel:534298578311708692>Erreur tu n'as pas les permissions.").then(m => m.delete(5000));
        let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!tomute) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser l'utilisateur").then(m => m.delete(5000));
        if (tomute.hasPermission("MUTE_MEMBERS")) return message.channel.send("<:cancel:534298578311708692>Erreur cet utilisateur a trop de permissions.").then(m => m.delete(5000));
        let muterole = message.guild.roles.find(`name`, "Muted");
        if (!muterole) {
                try {
                        muterole = await message.guild.createRole({
                                name: "Muted",
                                color: "#000000",
                                permissions: []
                        })
                        message.guild.channels.forEach(async (channel, id) => {
                                await channel.overwritePermissions(muterole, {
                                        SEND_MESSAGES: false,
                                        ADD_REACTIONS: false
                                });
                        });
                } catch (e) {
                        console.log(e.stack);
                }
        }
        let mutetime = args[1];
        if (!mutetime) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser le temps du mute.").then(m => m.delete(5000));
        let raison = args[2];
        if (!raison) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser la raison").then(m => m.delete(5000));
        await (tomute.addRole(muterole.id));
        message.channel.send(`**<:policeman:534295497800941578>  <@${tomute.id}> à été mute**`);
        if(!tomute.bot) {
                tomute.send(`Tu as été mute du discord **${message.guild.name}** pendant **${ms(ms(mutetime))}** !`);
        }
        

        let muteEmbed = new Discord.RichEmbed()
                .setDescription("<:auction:534295030135914506>TEMPMUTE")
                .setColor(db.get(`embed`))
                .addField("<:user:534295017695739905>L'utilisateur mute", `${tomute}`, true)
                .addField("<:policeman:534295497800941578>Mute par", `<@${message.author.id}>`, true)
                .addField("<:hourglassa:534314391286579201>Mute pendant", ms(ms(mutetime)), true)
                .addField("<:omnichannel:534294956001591299>Channel", message.channel, true)                
                .addField("<:toolscrosssettingssymbolforinter:534294991120367616>Raison", raison, true)
                .setFooter(bot.user.username)
                .setTimestamp(message.createdAt);
                let logsChannel = bot.channels.get(db.get(`logs`))
                if (!logsChannel) return
                logsChannel.send(muteEmbed).catch(console.error);
                


        setTimeout(function () {
                tomute.removeRole(muterole.id);
                tomute.send(`Tu as été unmute du discord **${message.guild.name}** !`);

        }, ms(mutetime));
        let historique = JSON.parse(fs.readFileSync("./utils/historique.json", "utf8"));
        let idHistorique = JSON.parse(fs.readFileSync("./utils/id.json", "utf8"));


        let hUser = tomute;
        let hRaison = raison;
        if (!idHistorique[hUser.id]) idHistorique[hUser.id] = {
                total: 0
        }
        if (!historique[hUser.id]) historique[hUser.id] = {}

        historique[hUser.id][idHistorique[hUser.id].total + 1] = {
                type: "5",
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
        name: "tempmute"
}