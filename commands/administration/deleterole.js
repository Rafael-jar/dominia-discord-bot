
const Discord = require("discord.js");
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    message.delete();
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("<:cancel:534298578311708692>Erreur tu n'as pas les permissions.").then(m => m.delete(5000));
    let role = args.join(" ");
    if(!role) return message.channel.send(`<:cancel:534298578311708692>Erreur Syntaxe: \`.deleterole <nom du role (:warning: pas d'id.)>\` Pour le nom il ne peut pas y avoir d'espace`)
    let vrole = message.guild.roles.find(`name`, role);
    if(!vrole) return message.channel.send("<:cancel:534298578311708692>Erreur je ne trouve pas le role.")
    const deleteembed = new Discord.RichEmbed()
        .setDescription("Etes-vous sur de vouloir supprimer ce role ?")
        .setColor(db.get(`embed`))
        .addField("✅️Oui", `Réagis pour confirmer`, true)
        .addField("❌Non", `Réagis pour annuler.`, true)
        .setFooter(bot.user.username)
        .setTimestamp(message.createdAt);
    const msg = await message.channel.send({
        embed: deleteembed
    });

    await msg.react('❌');
    await msg.react('✅');


    const panier = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

    panier.on('collect', async (reaction) => {
        if (reaction.emoji.name === '❌') {
            message.author.send("<:confirm:534355831982915609> Votre demande a été annulée.")
        }
        if (reaction.emoji.name === '✅') {
            vrole.delete();
            message.author.send("<:confirm:534355831982915609> Role supprimé avec succés");
        }
    });
	msg.delete();
}

module.exports.help = {
    name: "deleterole"
}