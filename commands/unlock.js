const Discord = require("discord.js");
const utils = require('../utils/utils.js')
const mysql = require('mysql')

module.exports.run = async (bot, message, args) => {
    //mets le bdd
    
    let everyone = message.guild.roles.find("name", "@everyone");
    let mod = message.guild.roles.find("name", "🚔 • Modérateur");
    message.delete()
    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return utils.noPerms(message, "BAN_MEMBERS");
    let salon;
    if (!args[0]) {
        salon = message.channel
    } else if(args[0] === "all"){
        bdd.query(`SELECT * FROM \`lock\` where status = '1'`, (err, rows2) => {
            message.channel.send("<a:loading:566988474436288515> Ouverture des salons").then(m =>
                setTimeout(function(){
                    m.edit(`<:confirm:566988762848952321> Salons ouverts avec succès`)
                    m.delete(5000)
                 }, 5000) 
            )
            rows2.forEach((row) => {
                let salonall = message.guild.channels.find(ch => ch.id === row.id)
                salonall.overwritePermissions(everyone, {
                    SEND_MESSAGES: null
                });
                bdd.query(`UPDATE \`lock\` SET status = 0 WHERE id = \'${salonall.id}\'`)
            })
        })
    } else{
        salon = message.guild.channels.find(ch => ch.name === args[0])
        if(!salon) return utils.errorPerso(message, "Le salon est invalide ! Assurez-vous de fournir un nom de salon valide sans le `#`");
    }
    bdd.query(`SELECT * FROM \`lock\` WHERE id = '${salon.id}'`, (err, rows) => {
        if(!rows[0]) return utils.errorPerso(message, "Ce salon ne peut pas être unlock si vous pensez que c'est une erreur contactez Raffon ou Franklin");
        if(rows[0].status === 0) return utils.errorPerso(message, "Ce salon est déjà ouvert !");
    salon.overwritePermissions(everyone, {
        SEND_MESSAGES: false
    });
    message.channel.send("<a:loading:566988474436288515> Ouverture du salon").then(m =>
        setTimeout(function(){
           m.edit(`<:confirm:566988762848952321> Salon ouvert avec succ�s`)
           m.delete(5000)
        }, 2000)        
    )
        bdd.query(`UPDATE \`lock\` SET status = 1 WHERE id = \'${salon.id}\'`)
})}

module.exports.help = {
    name: "unlock",
    category: "Moderation",
    info: {
            description: "Permet d'ouvrir un ou tous les channels du serveur.",
            usage: "<nom-du-salon> | .unlock all"
    }
}
