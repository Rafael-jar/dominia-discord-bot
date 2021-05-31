const Discord = require("discord.js")
/*const utils = require('../../utils/utils.js')
const type = require('../../botconfig/staff/sanction.json');
const mysql = require('mysql')
var bdd = mysql.createConnection({
    host: "localhost",
    user: "dominiabot",
    password: "Cms3hw",
    database: "dominiabot"
})

bdd.connect(err => {
    if(err) throw err
    console.log("Connected to database")
})*/

module.exports.run = async (bot, message, args) => {
   /* message.delete();
    if (!message.guild.member(bot.user).hasPermission('BAN_MEMBERS')) return utils.botNoPerms(message, "BAN_MEMBERS")
    let id = args[1];
    let fonc = args[0];
    if(fonc !== "view" && fonc !== "edit"&& fonc !== "remove") return utils.successfulErrorDelete(message, 'Erreur syntaxe, `.sanction <view/edit/remove> <id-sanction>`')
    if(!args[1]) return utils.successfulErrorDelete(message, `Erreur syntaxe, \`.sanction <view/edit/remove> <id-sanction>\``)
    if(fonc === "view") {
        bdd.query(`SELECT * FROM historique WHERE id = '${args[1]}'`, (err, rows) => {
            if(!rows) return utils.successfulErrorDelete(message, `Je n'arrive pas à trouver cette sanction !`)
            let statut = rows[0].statut
            let typeuh = type[rows[0].type]
            let playerid = rows[0].playerId
            let moderator = rows[0].moderator
            let raison = rows[0].raison
            let User = message.guild.members.get(playerid)
            let modo = message.guild.members.get(moderator)
            let date = rows[0].date
            let username
            let modoname
            if(!User) username = `Cet utilisateur a quitté le discord \`id -> ${playerid}\``
            else username = User.user.username
            if(!modo) modoname = `Cet utilisateur a quitté le discord \`id -> ${moderator}\``
            else modoname = modo.user.username
            if(!User) photo = `https://cdn0.iconfinder.com/data/icons/free-social-media-set/24/discord-512.png`
            else photo = User.user.displayAvatarURL

            const sanction = new Discord.RichEmbed()
                .setColor("#4286f4")//bot.config.color.discord
                .setAuthor(username, photo)
                .addField(`<:policeman:500424315062190101> Sanction`, `Type ❱ **${typeuh}**\nRaison ❱ **${raison}**\nModérateur ❱ **${modoname}**\nJoueur sanctionné ❱ **${username}**\nId sanction ❱ **${args[1]}**`)
                .setFooter(bot.user.username, bot.user.displayAvatarURL)
                .setTimestamp();
            message.author.send(sanction)
        })
    } else if(fonc === "edit") {
        bdd.query(`SELECT * FROM historique WHERE id = '${args[1]}'`, (err, rows) => {
            if(!rows) return utils.successfulErrorDelete(message, `Je n'arrive pas à trouver cette sanction !`)
            let raison = rows[0].raison
            const filter = m => m.author.id === message.author.id;
            message.channel.send(`Ancienne raison ❱ ${raison}`).then(m => {m.delete(20000)})
            message.channel.send(`${message.author}, Pouvez vous me fournir la nouvelle raison ?\n\nTappez \`cancel\` pour annuler (expire dans 20 secondes)`).then(m => {m.delete(20000)})
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000
            }).then(getraison => {
                if (getraison.first().content === 'cancel') {
                    return utils.successfulDelete(message, 'Votre demande a été annulée')
                }
                let playerid = rows[0].playerId
                let moderator = rows[0].moderator
                let User = message.guild.members.get(playerid)
                let modo = message.guild.members.get(moderator)
                let newRaison = getraison.first().content
                getraison.first().delete()
                bdd.query(`UPDATE \`historique\` SET raison = '${newRaison}' WHERE id = '${id}'`)
                utils.successfulDelete(message, `La raison de la sanction \`${id}\` a été changée. Nouvelle raison \`${newRaison}\``)
                if(!User) return
                User.send(`Je vous annonce qu'un modérateur vient de changer la raison de votre sanction (\`id ❱ ${id}, type ❱ ${type[rows[0].type]}\`) vient d'être changée vers \`${newRaison}\``)
            })
        })
    } else if(fonc === 'remove') {
        bdd.query(`SELECT * FROM historique WHERE id = '${args[1]}'`, (err, rows) => {
            if(!rows) return utils.successfulErrorDelete(message, `Je n'arrive pas à trouver cette sanction !`)
            const choix = new Discord.RichEmbed()
            .setColor("#4286f4")//bot.config...
            .setTitle(`Etes-vous sur de vouloir supprimer la sanction ${id} ?`)
            .addField(`✅ Oui`, `Réagissez avec cet emoji pour continuer.`)
            .addField(`❌ Non`, `Réagissez avec cet emoji pour annuler.`)
            .setFooter(bot.user.username, bot.user.displayAvatarURL)
            .setTimestamp();
            message.channel.send(choix).then(msg => {
    
        msg.react('✅');
        msg.react('❌');
    
        const panier = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
    
        panier.on('collect', async (reaction) => {
            if (reaction.emoji.name === '✅') {
                let muterole = message.guild.roles.find(`name`, "Muted");
                let playerid = rows[0].playerId
                let User = message.guild.members.get(playerid)
                let date = rows[0].date
                bdd.query(`DELETE FROM \`historique\` WHERE id = '${id}'`)
                msg.delete()
                let typeuh = type[rows[0].type]
                
                if(typeuh === "mute") {
                    User.removeRole(muterole.id)
                } else if(typeuh === 'tempmute') {
                    User.removeRole(muterole.id)
                } else if(typeuh === 'ban') {
                    let search = bot.users.filter(r => r.username.toLowerCase().includes(playerid.toLowerCase()) || r.id === playerid)

                    if (search.size == 1) {
                            search.map(r => {
                                    bot.fetchUser(r.id).then(id => {
                                            message.guild.unban(id).catch(err => {
                                                    message.channel.send(`<:policeman:500424315062190101> **${r.username}** a bien été unban !`)
                                            });
                                    }).catch(() => {
                                            utils.errorPerso(message, "Je ne trouve pas cet utilisateur");
                                            return;
                                    });
                            })
                    } else if (search.size == 0) {
                            bot.fetchUser(sUser).then(id => {
                                    message.guild.unban(id).catch(err => {
                                            message.channel.send(`<:policeman:500424315062190101> Ce membre a bien été unban !`)
                                    });
                            }).catch(() => {
                                    utils.errorPerso(message, "Je ne trouve pas cet utilisateur");
                                    return;
                            });
                })
                } else if(typeuh === 'tempban') {
                    let search = bot.users.filter(r => r.username.toLowerCase().includes(playerid.toLowerCase()) || r.id === playerid)

                    if (search.size == 1) {
                            search.map(r => {
                                    bot.fetchUser(r.id).then(id => {
                                            message.guild.unban(id).catch(err => {
                                                    message.channel.send(`<:policeman:500424315062190101> **${r.username}** a bien été unban !`)
                                            });
                                    }).catch(() => {
                                            utils.errorPerso(message, "Je ne trouve pas cet utilisateur");
                                            return;
                                    });
                            })
                    } else if (search.size == 0) {
                            bot.fetchUser(sUser).then(id => {
                                    message.guild.unban(id).catch(err => {
                                            message.channel.send(`<:policeman:500424315062190101> Ce membre a bien été unban !`)
                                    });
                            }).catch(() => {
                                    utils.errorPerso(message, "Je ne trouve pas cet utilisateur");
                                    return;
                            });
                }
                if(!User) return
                User.send(`Je vous informe qu'un modérateur vient de révoquer votre ${typeuh} !`)
    
            }
            else if(reaction.emoji.name === "❌") {
                msg.delete();
                return;
            }
        });
    })})
        }*/

}
module.exports.help = {
    name: "sanction",
    category: "Moderation",
    info: {
            description: "Permet d'expulser un membre du discord",
            usage: "<view/edit/remove> <Id-Sanction>"
    }
}