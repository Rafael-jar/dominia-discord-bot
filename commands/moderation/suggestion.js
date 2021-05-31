const Discord = require("discord.js");
const utils = require('../../utils/utils.js')
//channel find
module.exports.run = async (bot, message, args) => {
        message.delete();

        (async function () {
            const channelstaff = message.guild.channels.find("name","suggestions-staff")
            const channeljoueur = message.guild.channels.find("name","suggestions")
            let suggestion = args.join(" ");
            if(suggestion.length > 2000) return utils.errorPerso(message, "Votre suggestion dépasse le nombre de caractères autorisés (**2000**)")
            const embedstaff = new Discord.RichEmbed()
                .setColor("#4286f4")
                .setTitle(`Suggestion de ${message.author.username}`)
                .addField(`<:plus:546777258375905282>Status:`, `Attente de confirmation`)
                .addField(`<:offline:500417134850080779>Suggestion:`, `${suggestion}`)
                .addField(`<:policeman:500424315062190101>Avis Staff:`, `Vous pouvez donner votre avis avec les réactions ci-desous:\n✅Voter oui\n❌Voter non (il vous sera demandé de préciser une raison)\n🛑Annuler la suggestion (il vous sera demandé de préciser une raison)`)
                .addField(`<:user:547038974477205524>Avis Joueurs:`, `Aucun joueurs n'a donné son avis pour l'instant`)
                .setFooter(bot.user.username, bot.user.displayAvatarURL)
                .setTimestamp();
            const embedjoueur = new Discord.RichEmbed()
                .setColor("#4286f4")
                .setTitle(`Suggestion de ${message.author.username}`)
                .addField(`<:plus:546777258375905282>Status:`, `Attente de confirmation`)
                .addField(`<:offline:500417134850080779>Suggestion:`, `${suggestion}`)
                .addField(`<:policeman:500424315062190101>Avis Staff:`, `Aucun staff n'a donné son avis pour l'instant`)
                .addField(`<:user:547038974477205524>Avis Joueurs:`, `Vous pouvez donner votre avis avec les réactions ci-desous:\n<:yes:546777258397007923>Voter oui\n<:no:546777258338156554>Voter non`)
                .setFooter(bot.user.username, bot.user.displayAvatarURL)
                .setTimestamp();
            const joueur = await channeljoueur.send({
                    embed: embedjoueur
            })
            const staff = await channelstaff.send({
                embed: embedstaff
            })

            
            
            await joueur.react(bot.emojis.find(emoji => emoji.name === "yes"))
            await joueur.react(bot.emojis.find(emoji => emoji.name === "no") )

            await staff.react('✅')
            await staff.react('❌')
            await staff.react('🛑')

            let a = 1
            while (a = 1) {
                let code = Math.floor(Math.random() * 100001);
                bdd.query(`SELECT * FROM \`suggestion\` where id = ${code}`, (err, rows) => {
                    if(!rows[0]) {
                        bdd.query(`INSERT INTO \`suggestion\` (msgstaff, msgsug, iduser, id, suggestion, avistaff, avisjoueur, countstaffpos, countstaffne) VALUES('${staff.id}', '${joueur.id}', '${message.author.id}', ${code}, ${suggestion}, rien, rien, 0, 0)`)
                        a = 2
                    } else {
                        return
                    }
                })
                
            }
            utils.successful(message, 'Ta suggestion a été prise en compte tu peux voir son status et les avis ici #suggestion')
            const panier = joueur.createReactionCollector((reaction, user) => !user.bot);

            panier.on('collect', async (reaction, user) => {
                //bdd.query(`SELECT * FROM \`suggestion\` where id = ${code}`, (err, rows) => {
                if (reaction.emoji.name === 'yes'){
                    let code = rows[0].id
                    let avis = rows[0].avisjoueur
                    if(!avis) {
                        avis = `<:yes:546777258397007923> ${user.username}`
                    } else {
                        avis = avis + `\n<:yes:546777258397007923> ${user.username}`
                    }
                    const embedjoueurm = new Discord.RichEmbed()
                        .setColor("#4286f4")
                        .setTitle(`Suggestion de ${message.author.username}`)
                        .addField(`<:plus:546777258375905282>Status:`, `Attente de confirmation`)
                        .addField(`<:offline:500417134850080779>Suggestion:`, `${suggestion}`)
                        .addField(`<:policeman:500424315062190101>Avis Staff:`, `${staff2}`)
                        .addField(`<:user:547038974477205524>Avis Joueurs:`, `${avis}`)
                        .setFooter(bot.user.username, bot.user.displayAvatarURL)
                        .setTimestamp();
                    joueur.edit(embedjoueurm)
                    let staff1 = rows[0].avisstaff
                    if(!staff1) {
                        staff1 = 'Vous pouvez donner votre avis avec les réactions ci-desous:\n✅Voter oui\n❌Voter non (il vous sera demandé de préciser une raison)\n🛑Annuler la suggestion (il vous sera demandé de préciser une raison)'
                    }
                    const embedstaffm = new Discord.RichEmbed()
                        .setColor("#4286f4")
                        .setTitle(`Suggestion de ${message.author.username}`)
                        .addField(`<:plus:546777258375905282>Status:`, `Attente de confirmation`)
                        .addField(`<:offline:500417134850080779>Suggestion:`, `${suggestion}`)
                        .addField(`<:policeman:500424315062190101>Avis Staff:`, `${staff1}`)
                        .addField(`<:user:547038974477205524>Avis Joueurs:`, `${avis}`)
                        .setFooter(bot.user.username, bot.user.displayAvatarURL)
                        .setTimestamp();
                    staff.edit(embedstaffm)
                    //bdd.query(`UPDATE \`suggestion\` SET avisjoueur = ${avis} WHERE id = \'${code}\'`)
                } else if (reaction.emoji.name === 'no') {
                    let avis = rows[0].avisjoueur
                    
                    let code = rows[0].id
                    if(!avis) {
                        avis = `<:no:546777258338156554> ${user.username}`
                    } else {
                        avis = avis + `\n<:no:546777258338156554> ${user.username}`
                    }
                    let staff2 = rows[0].avisstaff
                    if(!staff2) {
                        staff2 = 'Aucun staff n\'a donné son avis pour l\'instant'
                    }
                    const embedjoueurm = new Discord.RichEmbed()
                        .setColor("#4286f4")
                        .setTitle(`Suggestion de ${message.author.username}`)
                        .addField(`<:plus:546777258375905282>Status:`, `Attente de confirmation`)
                        .addField(`<:offline:500417134850080779>Suggestion:`, `${suggestion}`)
                        .addField(`<:policeman:500424315062190101>Avis Staff:`, `${staff2}`)
                        .addField(`<:user:547038974477205524>Avis Joueurs:`, `${avis}`)
                        .setFooter(bot.user.username, bot.user.displayAvatarURL)
                        .setTimestamp();
                    joueur.edit(embedjoueurm)
                    let staff1 = rows[0].avisstaff
                    if(!staff1) {
                        staff1 = 'Vous pouvez donner votre avis avec les réactions ci-desous:\n✅Voter oui\n❌Voter non (il vous sera demandé de préciser une raison)\n🛑Annuler la suggestion (il vous sera demandé de préciser une raison)'
                    }
                    const embedstaffm = new Discord.RichEmbed()
                        .setColor("#4286f4")
                        .setTitle(`Suggestion de ${message.author.username}`)
                        .addField(`<:plus:546777258375905282>Status:`, `Attente de confirmation`)
                        .addField(`<:offline:500417134850080779>Suggestion:`, `${suggestion}`)
                        .addField(`<:policeman:500424315062190101>Avis Staff:`, `${staff1}`)
                        .addField(`<:user:547038974477205524>Avis Joueurs:`, `${avis}`)
                        .setFooter(bot.user.username, bot.user.displayAvatarURL)
                        .setTimestamp();
                    staff.edit(embedstaffm)
                    //bdd.query(`UPDATE \`suggestion\` SET avisjoueur = ${avis} WHERE id = \'${code}\'`)
                }

            //})
        })
        const panierstaff = staff.createReactionCollector((reaction, user) => !user.bot);

        panierstaff.on('collect', async (reaction, user) => {
            //bdd.query(`SELECT * FROM \`suggestion\` where id = ${code}`, (err, rows) => {
                let avis = rows[0].avisstaff
                let code = rows[0].id
                let avisplay = rows[0]. avisjoueur
                if(!avisplay) {
                    avisplay = `Aucun joueurs n'a donné son avis pour l'instant`
                }
                const filter = m => m.author.id === user.id;
                if (reaction.emoji.name === '✅'){
                            let count = new Number(rows[0].countstaffpos)
                            if(!avis) {
                                avis = `✅ ${user.username}`
                            } else {
                                avis = avis + `\n✅ ${user.username}`
                            }
                            count = count + 1
                            if(count === 3) {
                            const embedstaffm = new Discord.RichEmbed()
                                .setColor(`#04db19`)
                                .setTitle(`Suggestion de ${message.author.username}`)
                                .addField(`<:plus:546777258375905282>Status:`, `Confirmé`)
                                .addField(`<:offline:500417134850080779>Suggestion:`, `${suggestion}`)
                                .addField(`<:policeman:500424315062190101>Avis Staff:`, `${avis}`)
                                .addField(`<:user:547038974477205524>Avis Joueurs:`, `${avisplay}`)
                                .setFooter(bot.user.username, bot.user.displayAvatarURL)
                                .setTimestamp();
                            const embedjoueurm = new Discord.RichEmbed()
                                .setColor(`#04db19`)                
                                .setTitle(`Suggestion de ${message.author.username}`)
                                .addField(`<:plus:546777258375905282>Status:`, `Confirmé`)
                                .addField(`<:offline:500417134850080779>Suggestion:`, `${suggestion}`)
                                .addField(`<:policeman:500424315062190101>Avis Staff:`, `${avis}`)
                                .addField(`<:user:547038974477205524>Avis Joueurs:`, `${avisplay}`)
                                .setFooter(bot.user.username, bot.user.displayAvatarURL)
                                .setTimestamp();
                            playermsg.edit(embedjoueurm)
                            staffmsg.edit(embedstaffm)

                            message.author.send(`Bonjour,\nNous sommes heureux de vous annoncer que votre suggestion a été acceptée .Nous allons essayer de la mettre en place le plus vite possible !\nCordialement,\nLe Staff`)	
                            }
                        const embedstaffm = new Discord.RichEmbed()
                                .setColor("#4286f4")
                                .setTitle(`Suggestion de ${message.author.username}`)
                                .addField(`<:plus:546777258375905282>Status:`, `Attente de confirmation`)
                                .addField(`<:offline:500417134850080779>Suggestion:`, `${suggestion}`)
                                .addField(`<:policeman:500424315062190101>Avis Staff:`, `${avis}`)
                                .addField(`<:user:547038974477205524>Avis Joueurs:`, `${avisplay}`)
                                .setFooter(bot.user.username, bot.user.displayAvatarURL)
                                .setTimestamp();
                        const embedjoueurm = new Discord.RichEmbed()
                                .setColor("#4286f4")
                                .setTitle(`Suggestion de ${message.author.username}`)
                                .addField(`<:plus:546777258375905282>Status:`, `Attente de confirmation`)
                                .addField(`<:offline:500417134850080779>Suggestion:`, `${suggestion}`)
                                .addField(`<:policeman:500424315062190101>Avis Staff:`, `${avis}`)
                                .addField(`<:user:547038974477205524>Avis Joueurs:`, `${avisplay}`)
                                .setFooter(bot.user.username, bot.user.displayAvatarURL)
                                .setTimestamp();
                        playermsg.edit(embedjoueurm)
                        staffmsg.edit(embedstaffm)



                } else if (reaction.emoji.name === `❌`) {
                    let count = new Number(rows[0].countstaffne)
                    count = count + 1
                    if(count === 3) {
                    staff.delete()
                    joueur.delete()
                    message.author.send(`Bonjour,\nNous sommes désolé de vous annoncer que votre suggestion a été refusée pour les raisons suivantes:\`\`\`${avis}\`\`\`. Si vous voulez nous soumettre d’autres idées n’hésitez pas !\nCordialement,\nLe Staff`)	
                    }
                    channelstaff.send(`${message.author}, Pouvez vous me fournir une raison ?\n\nTappez \`cancel\` pour annuler`)
                    channelstaff.awaitMessages(filter, {
                        max: 1,
                        time: 10000
                    }).then(getraison => {
                        getraison.delete(15000);
                        if (getraison.first().content === 'cancel') {
                                return successfulUtil.successfulError(message, 'Votre vote a été annulé')

                        }
                        avis = avis + `\n❌ ${user.username} \`${getraison.first().content}\``
                        const embedstaffm = new Discord.RichEmbed()
                            .setColor("#4286f4")
                            .setTitle(`Suggestion de ${message.author.username}`)
                            .addField(`<:plus:546777258375905282>Status:`, `Attente de confirmation`)
                            .addField(`<:offline:500417134850080779>Suggestion:`, `${suggestion}`)
                            .addField(`<:policeman:500424315062190101>Avis Staff:`, `${avis}`)
                            .addField(`<:user:547038974477205524>Avis Joueurs:`, `${avisplay}`)
                            .setFooter(bot.user.username, bot.user.displayAvatarURL)
                            .setTimestamp();
                        const embedjoueurm = new Discord.RichEmbed()
                            .setColor("#4286f4")
                            .setTitle(`Suggestion de ${message.author.username}`)
                            .addField(`<:plus:546777258375905282>Status:`, `Attente de confirmation`)
                            .addField(`<:offline:500417134850080779>Suggestion:`, `${suggestion}`)
                            .addField(`<:policeman:500424315062190101>Avis Staff:`, `${avis}`)
                            .addField(`<:user:547038974477205524>Avis Joueurs:`, `${avisplay}`)
                            .setFooter(bot.user.username, bot.user.displayAvatarURL)
                            .setTimestamp();
                        playermsg.edit(embedjoueurm)
                        staffmsg.edit(embedstaffm)
                    })

                    
                } else if (reaction.emoji.name === '🛑'){
                    channelstaff.send(`${message.author}, Pouvez vous me fournir une raison ?\n\nTappez \`cancel\` pour annuler`)
                    channelstaff.awaitMessages(filter, {
                        max: 1,
                        time: 10000
                    }).then(getraison => {
                        if (getraison.first().content === 'cancel') {
                            return successfulUtil.successfulError(message, 'Votre demande a été annulé')

                        }
                        avis = avis + `\n❌ ${user.username} \`${getraison.first().content}\``
                        staff.delete()
                        joueur.delete()
                        message.author.send(`Bonjour,\nNous sommes désolé de vous annoncer que votre suggestion a été refusée pour les raisons suivantes:\`\`\`${avis}\`\`\`. Si vous voulez nous soumettre d’autres idées n’hésitez pas !\nCordialement,\nLe Staff`)	
                    })
                }
    
    //})
})

    

        }
                ());
}

module.exports.help = {
        name: "suggestion",
        category: "Utile",
        info: {
                description: "Permet de faire une suggestion au staff",
                usage: "<suggestion>"
        }
}