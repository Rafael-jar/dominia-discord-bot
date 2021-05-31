const Discord = require("discord.js");
const utils = require('../../utils/utils.js')
const mysql = require('mysql')

module.exports.run = async (bot, message, args) => {
    var bdd = mysql.createConnection({
        host: 'localhost',
        user: 'localhost',
        password: '',
        database: 'test'
    });

    bdd.connect(err => {
            if (err) throw err;

            bdd.query('SET NAMES utf8mb4');
    });
    

    
    let everyone = message.guild.roles.find("name", "@everyone");
    let mod = message.guild.roles.find("name", "🚔 • Modérateur");
    message.delete()
    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return utils.noPerms(message, "BAN_MEMBERS");
    let salon;
    if (!args[0]) {
        salon = message.channel
    } else if(args[0] === "all"){
        bdd.query(`SELECT * FROM lock where status = '0'`, (err, rows2) => {
            message.channel.send("<a:loading:566988474436288515> Fermeture des salons").then(m =>
                setTimeout(function(){
                    m.edit(`<:confirm:566988762848952321> Salons fermés avec succès`)
                    m.delete(5000)
                 }, 5000) 
            )
            rows2.forEach((row) => {
                let salonall = message.guild.channels.find(ch => ch.id === row.id)
                salonall.overwritePermissions(everyone, {
                    SEND_MESSAGES: false
                });
                bdd.query(`UPDATE lock SET status = 1 WHERE id = \'${salonall.id}\'`)
            })
            let logsChannel = bot.channels.get("522351097344425984")
            logsChannel.send(`Je vous informe que pour des raisons de sécuritées le discord vient d'être verrouillé par un membre du staff, nous nous excusons pour la gêne occasionnée.Nous faisons tout notre possible pour déverrouiller le discord au plus vite.\nCordialement,\nLe staff`)
        })
    } else{
        salon = message.guild.channels.find(ch => ch.name === args[0])
        if(!salon) return utils.errorPerso(message, "Le salon est invalide ! Assurez-vous de fournir un nom de salon valide sans le `#`");
    }
    bdd.query(`SELECT * FROM lock WHERE id = '${salon.id}'`, (err, rows) => {
        if(rows[0].length > 1) return utils.errorPerso(message, "Ce salon ne peut pas être lock si vous pensez que c'est une erreur contactez Raffon ou Franklin");
        if(rows[0].status === 1) return utils.errorPerso(message, "Ce salon est déjà verrouillé !");
    salon.overwritePermissions(everyone, {
        SEND_MESSAGES: false
    });
    message.channel.send("<a:loading:566988474436288515> Fermeture du salon").then(m =>
        setTimeout(function(){
           m.edit(`<:confirm:566988762848952321> Salon fermé avec succès`)
           m.delete(5000)
        }, 2000)        
    )
    salon.send(`Je vous informe que pour des raisons de sécuritées ce salon vient d'être fermé par un membre du staff, nous nous excusons pour la gêne occasionnée.Nous faisons tout notre possible pour réouvrir ce salon au plus vite.\nCordialement,\nLe staff`)
    bdd.query(`UPDATE lock SET status = 1 WHERE id = \'${salon.id}\'`)
})}

module.exports.help = {
    name: "lock",
    category: "Moderation",
    info: {
            description: "Permet de fermer un ou tous les channels du serveur.",
            usage: "<nom-du-salon> | .lock all"
    }
}