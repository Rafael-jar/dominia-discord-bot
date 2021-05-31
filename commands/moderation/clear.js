const Discord = require("discord.js");


const db = require('quick.db')

module.exports.run = async (bot, message, args) => {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("<:cancel:534298578311708692>Erreur tu n'as pas les permissions.").then(m => m.delete(5000));
        let ErrorEmbed = new Discord.RichEmbed()
                .setTitle("**ERROR**")
                .setDescription("Tu dois indiquer le nombre de message a supprimé !")
                .setColor(db.get(`embed`));
        if (!args[0]) message.channel.send(ErrorEmbed).then(msg => msg.delete(2000));
        if (args[0] < 101) {
                message.channel.bulkDelete(args[0]).then(() => {
                        message.channel.send(`${args[0]} messages ont été supprimé.`).then(msg => msg.delete(2000));
                });
        } else {
                message.channel.send("<:cancel:534298578311708692>Erreur Le clear doit être __égal__ ou __inférieur__ à **100**.");
        }

}

module.exports.help = {
        name: "clear"
}