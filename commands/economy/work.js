const Discord = require(`discord.js`);

const db = require('quick.db')
const ms = require('parse-ms')
 
module.exports.run = async (bot, message, args, tools) => {
    let min = db.get(`workmin`)
    let max = db.get(`workmax`)
    if(min === null) return message.channel.send(`Veuillez definir le max et min de cette commande`)
    if(max === null) return message.channel.send(`Veuillez definir le max et min de cette commande`)
    message.delete();
    let cooldown = 2.7e+6;
    let amount = Math.floor(Math.random()*(max-min+1)+min)
 
    let workcount = await db.fetch(`workcount__${message.author.id}`)
 
    if(workcount !== null && cooldown - (Date.now() - workcount) > 0) {
        let time = ms(cooldown - (Date.now() - workcount))
 
        message.channel.send(`<:cancel:534298578311708692>Erreur vous pouvez retravailler dans ${time.minutes} minutes`)
    } else {
        //work executé
        let replies = [
        `Tu es resté dans la rue comme un sdf tu as gagné ${amount}<:dollarsymbol:534349683020267520>.`,
        `Tu as travaillé toute la journée dans un bureau tu as gagné ${amount}<:dollarsymbol:534349683020267520>.`,
        `Tu cadres un youtuber connu tu gagnes ${amount}<:dollarsymbol:534349683020267520>.`,
        `Tu fais figurant dans le dernier Star Wars tu gagnes ${amount}<:dollarsymbol:534349683020267520>.`,
        `Tu travailles dans un MacDonalds durant une journée tu gagnes ${amount}<:dollarsymbol:534349683020267520>.`,
        `Tu vends des calendriers tu gagnes ${amount}<:dollarsymbol:534349683020267520>.`,
        `Tu trouves un portefeuille tu trouves ${amount}<:dollarsymbol:534349683020267520>.`,
        `Tu gagnes au loto tu gagnes ${amount}<:dollarsymbol:534349683020267520>.`,
        `Tu restes toute la journée dans la rue tu gagnes ${amount}<:dollarsymbol:534349683020267520>.`];
 
        let msg = Math.floor((Math.random() * replies.length));
        let msg1 = replies[msg];
        const emba = new Discord.RichEmbed()
            .setTitle("WORK")
            .setColor(db.get(`embed`))
            .setDescription(msg1)
            .setFooter(bot.user.username)
            .setTimestamp(message.createdAt);
        db.set(`workcount__${message.author.id}`, Date.now())
        db.add(`money__${message.author.id}`, amount)
        message.channel.send(emba)
    }
}
 
module.exports.help = {
    name: `work`
}