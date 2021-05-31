const Discord = require("discord.js");
const db = require(`quick.db`)
module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!message.channel.name.startsWith(`ticket__`)) return message.channel.send(`<:cancel:534298578311708692>Erreur vous devez executer cette commande dans le salon de votre ticket.`).then(m => m.delete(5000));
    const choix = new Discord.RichEmbed()
        .setColor(db.get(`embed`))
        .setTitle(`Etes-vous sur de vouloir supprimer ce salon ?`)
        .addField(`✅ Oui`, `Réagissez avec cet emoji pour continuer.`)
        .addField(`❌ Non`, `Réagissez avec cet emoji pour annuler.`)
        .setFooter(bot.user.username, bot.user.displayAvatarURL)
        .setTimestamp();
    const msg = await message.channel.send({
            embed: choix
    });

    await msg.react('✅');
    await msg.react('❌');

    const panier = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

    panier.on('collect', async (reaction) => {
        if (reaction.emoji.name === '✅') {
            let ticketch = message.guild.channels.find(`name`, `ticket__${message.author.id}`);

            ticketch.delete();
            message.author.send('<:confirm:534355831982915609>Salon supprimé avec succès.')

        }
        else if(reaction.emoji.name === "❌") {
            msg.delete();
            return;
        }
    });
    
    

};
module.exports.help = {
    name: "close"
}