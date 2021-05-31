const Discord = require(`discord.js`);

const db = require('quick.db')
const ms = require('parse-ms')
 
module.exports.run = async (bot, message, args, tools) => {
    let min = db.get(`volmin`)
    let max = db.get(`volmax`)
     let mec = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!mec) return message.channel.send("<:cancel:534298578311708692>Erreur Veuillez préciser l'utilisateur").then(m => m.delete(5000));

    if(min === null) return message.channel.send(`Veuillez definir le max et min de cette commande`)
    if(max === null) return message.channel.send(`Veuillez definir le max et min de cette commande`)
    message.delete()
    let cooldown = 4.32e+7
    let amount = Math.floor(Math.random()*(max-min+1)+min)
 
    let volcount = await db.fetch(`volcount__${message.author.id}`)
 
    if(volcount !== null && cooldown - (Date.now() - volcount) > 0) {
        let time = ms(cooldown - (Date.now() - volcount))
 
        message.channel.send(`<:cancel:534298578311708692>Erreur vous pouvez re faire un crime dans ${time.hours} heures et dans ${time.minutes} minutes .`)
    } else {
 
        let replies = [
        `Tu as réussi à voler la maison de ${mec} tu gagnes ${amount}<:dollarsymbol:534349683020267520>.`,
        `Tu as réussi à voler ${mec} tu gagnes ${amount}<:dollarsymbol:534349683020267520>.`];
        let msg = Math.floor((Math.random() * replies.length));
        let msg1 = replies[msg];//crime réussi
        const emb = new Discord.RichEmbed()
            .setTitle("VOL")
            .setColor("#00ff06")
            .setDescription(msg1)
            .setFooter(bot.user.username)
            .setTimestamp(message.createdAt);
 
 
        let repliesa = [
        `Tu t'es fais repéré en essayant de voler ${mec} tu perds ${amount}<:dollarsymbol:534349683020267520>.`,
        `Tu t'es fais attrapé par un vigile en essayant de voler la maison de ${mec} tu perds ${amount}<:dollarsymbol:534349683020267520>.`];
        let msga = Math.floor((Math.random() * repliesa.length));
        let msg1a = repliesa[msga];//crime foiré
        const emba = new Discord.RichEmbed()
            .setTitle("VOL")
            .setColor("#ff0000")
            .setDescription(msg1a)
            .setFooter(bot.user.username)
            .setTimestamp(message.createdAt);
        

        let probability = db.get(`failvol`)
        if(probability === null) return message.channel.send(`Veuillez definir le pourcentage de fail de cette commande`)
        let chance = Math.floor(Math.random() * 100) + 1;
        if(chance < 70) {
            message.channel.send(emba)
            db.subtract(`money__${message.author.id}`, amount)
        } else if(chance >= 70) {
            message.channel.send(emb)
            db.add(`money__${message.author.id}`, amount)
        }
        db.set(`volcount__${message.author.id}`, Date.now())
    }
}
 
module.exports.help = {
    name: `vol`
}