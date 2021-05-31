const Discord = require("discord.js");
const utils = require('../../utils/utils.js')

module.exports.run = async (bot, message, args, bdd, functions, prefix) => {
        //si c'est activé ça passe !
        let logChannel = message.guild.channels.find(`name`, `ticket__${message.author.id}`);
        if(logChannel) return message.channel.send(`<:error:534355820255641610>Erreur vous avez déja un ticket ici <#${logChannel.id}>`)    
        message.delete();
        bdd.query(`SELECT * FROM ticket WHERE discord_id = '${message.guild.id}' AND statut = '1'`, (err, rows) => {
        if(args[0] === "set") {
            if (!message.member.hasPermission("ADMINISTRATOR")) return utils.noPerms(message, "ADMINISTRATOR");
            if(!args[1]) {
                const embed = new Discord.RichEmbed()
                    .setColor(bot.config.color.principale)
                    .setTitle(`TICKET`)            
                    .setDescription(`\`${prefix}ticket set message <message>\` → Le message affiché lorsque la personne créé son ticket.\n\`${prefix}ticket set roles <add/remove/list> \` → Pouvoir choisir les roles qui auront l'autorisation de voir le ticket \n\`${prefix}set categorie <nom-de-la-catégorie>\` → Permet de changer la catégorie ds tickets`)
                    .setFooter(bot.user.username, bot.user.displayAvatarURL)
                    .setTimestamp();
            } else if(args[1] === "message") {
                let message  = args.join(' ').slice(args[1].length)
                if(rows.length < 1) {
                    bdd.query(`INSERT INTO ticket (message, categorie, role, discord_id) VALUES('${message}', '0', '0', '${message.guild.id}')`)
                } else {
                    bdd.query(`UPDATE ticket SET message = '${message}' WHERE discord_id = '${message.guild.id}'`)
                }
                
            } else if(args[1] === "categorie") {
                let categorie = server.channels.find(c => c.name == args.join(' ').slice(args[1].length) && c.type == "category")
                if(rows.length < 1) {
                    bdd.query(`INSERT INTO ticket (message, categorie, role, discord_id) VALUES('Un membre du staff va répondre à votre demande dans les plus brefs délais', '${categorie.id}', '0', '${message.guild.id}')`)
                } else {
                    bdd.query(`UPDATE ticket SET message = '${message}' WHERE discord_id = '${message.guild.id}'`)
                }
            } else if(args[1] === "roles") {
                //Franklin ! Franklin !
            }
        } if(args[0] === 'close') {
            if(!message.channel.name.startsWith(`ticket__`)) return utils.successfulErrorDelete(message, `vous devez executer cette commande dans le salon de votre ticket.`)
            const choix = new Discord.RichEmbed()
                .setColor("#343a42")
                .setTitle(`Etes-vous sur de vouloir supprimer ce salon ?`)
                .addField(`✅ Oui`, `Réagissez avec cet emoji pour continuer.`)
                .addField(`❌ Non`, `Réagissez avec cet emoji pour annuler.`)
                .setFooter(bot.user.username, bot.user.displayAvatarURL)
                .setTimestamp();
            const msg = message.channel.send({
                    embed: choix
            });
        
            await msg.react('✅');
            await msg.react('❌');
        
            const panier = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
        
            panier.on('collect', async (reaction) => {
                if (reaction.emoji.name === '✅') {
                    let ticketch = message.guild.channels.find(`name`, `ticket__${message.author.id}`);
                    if(!ticketch) {
                        if (!message.member.hasPermission("BAN_MEMBERS")) return utils.noPerms(message, "BAN_MEMBERS");
                        message.channel.delete();
                    } else {
                        ticketch.delete();
                    }
                    
                    utils.successfulDelete(message, 'Salon supprimé avec succès.')
        
                }
                else if(reaction.emoji.name === "❌") {
                    msg.delete();
                    return;
                }
            });
        } else if(!args[0]) {

            message.guild.createChannel(`ticket__${message.author.id}`, "text").then(c => {

            
        })}
    });

};

module.exports.help = {
    name: "welcome",
    category: "Modération",
    info: {
            description: "Permet de créer/supprimer un ticket et de configurer les options du ticket",
            usage: "[close/set] [message/categorie/roles]"
    }
}