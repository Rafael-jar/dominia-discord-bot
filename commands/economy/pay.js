const Discord = require("discord.js");

const db = require('quick.db')

module.exports.run = async (bot, message, args, tools) => {
    message.delete();
    if(!message.mentions.members.first()) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser l'utilisateur").then(m => m.delete(5000));
    let targetMember = message.mentions.members.first()
    let amount = args[1]

    if(isNaN(amount)) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser la money à donner")

    let targetBalance = await db.fetch(`money__${targetMember.id}`)
    let selfBalance = await db.fetch(`money__${message.author.id}`)

    if(targetBalance === null) targetBalance = 0
    if(selfBalance === null) selfBalance = 0

    if(amount > selfBalance) return message.channel.send("<:cancel:534298578311708692>Erreur vous n'avez pas assez d'argent")
    db.add(`money__${targetMember.id}`, amount)
    db.subtract(`money__${message.author.id}`, amount);
    message.channel.send(`<:confirm:534355831982915609>Vous avez envoyé ${amount} à ${targetMember.user.username}.`)
    targetMember.send(`Vous avez reçu ${amount} de ${message.author.username}`)

    const panierstaff = message.createReactionCollector((reaction, user) => user.bot === false);

        panierstaff.on('collect', async (reaction, user) => {
            user.username
        })
}

module.exports.help = {
    name: "pay"
}