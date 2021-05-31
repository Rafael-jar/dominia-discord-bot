const Discord = require(`discord.js`);

const db = require('quick.db')
const ms = require('parse-ms')
 
module.exports.run = async (bot, message, args, tools) => {
    let min = db.get(`crimemin`)
    let max = db.get(`crimemax`)
    if(min === null) return message.channel.send(`Veuillez definir le max et min de cette commande`)
    if(max === null) return message.channel.send(`Veuillez definir le max et min de cette commande`)
    message.delete()
    let cooldown = 1.8e+7
    let amount = Math.floor(Math.random()*(max-min+1)+min)
 
    let crimecount = await db.fetch(`crimecount__${message.author.id}`)
 
    if(crimecount !== null && cooldown - (Date.now() - crimecount) > 0) {
        let time = ms(cooldown - (Date.now() - crimecount))
 
        message.channel.send(`<:cancel:534298578311708692>Erreur vous pouvez re faire un crime dans ${time.hours} heures et dans ${time.minutes} minutes .`)
    } else {
        //work executé
 
        let replies = [
        `Tu as réussi à voler une voiture tu la vends et tu gagnes ${amount}<:dollarsymbol:534349683020267520>.`,
        `Tu as réussi à voler une maison tu trouves un mac tu le vends et gagnes ${amount}<:dollarsymbol:534349683020267520>.`,
        `Tu as réussi à voler une maison tu trouves un iphone tu le vends et gagnes ${amount}<:dollarsymbol:534349683020267520>.`,
        `Tu as réussi à voler un vélo tu la vends et tu gagnes ${amount}<:dollarsymbol:534349683020267520>.`,
        `Tu as réussi à voler un magasin tu trouves un mac tu le vends et gagnes ${amount}<:dollarsymbol:534349683020267520>.`,
        `Tu as réussi à voler un magasin tu trouves un iphone tu le vends et gagnes ${amount}<:dollarsymbol:534349683020267520>.`];
        let msg = Math.floor((Math.random() * replies.length));
        let msg1 = replies[msg];//crime réussi
        const emb = new Discord.RichEmbed()
            .setTitle("CRIME")
            .setColor("#00ff06")
            .setDescription(msg1)
            .setFooter(bot.user.username)
            .setTimestamp(message.createdAt);
 
 
        let repliesa = [
        `Tu es tombé essayant de voler une maison tu perds ${amount}<:dollarsymbol:534349683020267520>.`,
        `Tu t'es fais repéré en essayant de voler une maison tu perds ${amount}<:dollarsymbol:534349683020267520>.`,
        `Tu t'es fais attrapé par un vigile en essayant de voler un magasin tu perds ${amount}<:dollarsymbol:534349683020267520>.`,];
        let msga = Math.floor((Math.random() * repliesa.length));
        let msg1a = repliesa[msga];//crime foiré
        const emba = new Discord.RichEmbed()
            .setTitle("CRIME")
            .setColor("#ff0000")
            .setDescription(msg1a)
            .setFooter(bot.user.username)
            .setTimestamp(message.createdAt);
        

        let probability = db.get(`failcrime`)
        if(probability === null) return message.channel.send(`Veuillez definir le pourcentage de fail de cette commande`)
        let chance = Math.floor(Math.random() * 100) + 1;
        if(chance < 70) {
            message.channel.send(emba)
            db.subtract(`money__${message.author.id}`, amount)
        } else if(chance >= 70) {
            message.channel.send(emb)
            db.add(`money__${message.author.id}`, amount)
        }
        db.set(`crimecount__${message.author.id}`, Date.now())
    }
}
 
module.exports.help = {
    name: `crime`
}