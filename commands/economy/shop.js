const Discord = require("discord.js");

const db = require('quick.db')
let prefix = db.get(`prefix`)
if(prefix === null) prefix = "."

module.exports.run = async (bot, message, args, tools) => {
    message.delete();
    let money = db.get(`money__${message.author.id}`)
    if(args[0] <= 6) {
        let player = message.guild.member(message.author)
        let red = message.guild.roles.find(`name`, "red");
        let green = message.guild.roles.find(`name`, "green");
        let blue = message.guild.roles.find(`name`, "blue");
        let brown = message.guild.roles.find(`name`, "brown");
        let yellow = message.guild.roles.find(`name`, "yellow");
        let pink = message.guild.roles.find(`name`, "pink");
        if(money <= 2500) return message.channel.send(`<:cancel:534298578311708692>Erreur vous n'avez pas assez d'argent.`)
       if(message.member.roles.has(pink.id)) {
           message.member.removeRole(pink)
       }
       if(message.member.roles.has(red.id)) message.member.removeRole(red)
       if(message.member.roles.has(green.id)) message.member.removeRole(green)
       if(message.member.roles.has(brown.id)) message.member.removeRole(brown)
       if(message.member.roles.has(yellow.id)) message.member.removeRole(yellow)
       if(message.member.roles.has(blue.id)) message.member.removeRole(blue)
 
       if(args[0] === "1") {
           if(db.get(`red__${message.author.id}`) === 1) {
               player.addRole(red)
               message.channel.send(`<:confirm:534355831982915609>Role ajouté avec succès.`)
               return
           }
           db.substract(`money__${message.author.id}`, 2500)
           db.set(`red__${message.author.id}`, 1)
           message.channel.send('<:confirm:534355831982915609>Vous avez bien acheté le grade rouge')
           player.addRole(red)
 
       } else if(args[0] === "2") {
           if(db.get(`green__${message.author.id}`) === 1) {
               player.addRole(green)
               message.channel.send(`<:confirm:534355831982915609>Role ajouté avec succès.`)
               return
           }
           db.substract(`money__${message.author.id}`, 2500)
           db.set(`green__${message.author.id}`, 1)
           message.channel.send('<:confirm:534355831982915609>Vous avez bien acheté le grade vert.')
           player.addRole(green)
       
       } else if(args[0] === "3") {
           if(db.get(`pink__${message.author.id}`) === 1) {
               player.addRole(pink)
               message.channel.send(`<:confirm:534355831982915609>Role ajouté avec succès.`)
               return
           }
           db.substract(`money__${message.author.id}`, 2500)
           db.set(`pink__${message.author.id}`, 1)
           message.channel.send('<:confirm:534355831982915609>Vous avez bien acheté le grade rose.')
           player.addRole(pink)
       
       } else if(args[0] === "4") {
           if(db.get(`yellow__${message.author.id}`) === 1) {
               player.addRole(yellow)
               message.channel.send(`<:confirm:534355831982915609>Role ajouté avec succès.`)
               return
           }
           db.substract(`money__${message.author.id}`, 2500)
           db.set(`yellow__${message.author.id}`, 1)
           message.channel.send('<:confirm:534355831982915609>Vous avez bien acheté le grade jaune.')
           player.addRole(yellow)
       
       } else if(args[0] === "5") {
           if(db.get(`blue__${message.author.id}`) === 1) {
               player.addRole(blue)
               message.channel.send(`<:confirm:534355831982915609>Role ajouté avec succès.`)
               return
           }
           db.substract(`money__${message.author.id}`, 2500)
           db.set(`blue__${message.author.id}`, 1)
           message.channel.send('<:confirm:534355831982915609>Vous avez bien acheté le grade bleu.')
           player.addRole(blue)
       
       } else if(args[0] === "6") {
           if(db.get(`brown__${message.author.id}`) === 1) {
               player.addRole(brown)
               message.channel.send(`<:confirm:534355831982915609>Role ajouté avec succès.`)
               return
           }
           db.substract(`money__${message.author.id}`, 2500)
           db.set(`brown__${message.author.id}`, 1)
           message.channel.send('<:confirm:534355831982915609>Vous avez bien acheté le grade brun.')
           player.addRole(brown)      
       }
   }
    else if(!args[0]) {
        const shop = new Discord.RichEmbed()
            .setTitle("<:shoppingcart:539876435104628738>Shop")
            .setDescription(`Vous pouvez acheter ces roles en faisant:\`${prefix}shop <id>\` et si vous avez déja achetez un objet et vous souhaitez vous le mettre faite \`.shop <id>\`.`)
            .setColor(db.get(`embed`))
            .addField(`Red Rank`, `Prix:\`2500\`<:dollarsymbol:534349683020267520>   Id:\`1\``)
            .addField(`Green Rank`, `Prix:\`2500\`<:dollarsymbol:534349683020267520>    Id:\`2\``)
            .addField("Pink Rank", `Prix:\`2500\`<:dollarsymbol:534349683020267520>    Id:\`3\``)
            .addField(`Yellow Rank`, `Prix:\`2500\`<:dollarsymbol:534349683020267520>    Id:\`4\``)
            .addField(`Blue Rank`, `Prix:\`2500\`<:dollarsymbol:534349683020267520>    Id:\`5\``)
            .addField(`Brown Rank`, `Prix:\`2500\<:dollarsymbol:534349683020267520>    Id:\`6\``)
            .addField(`XP -> Money`, `Prix:\`250xp -> 1000\<:dollarsymbol:534349683020267520>    Id:\`7\``)             
            .setFooter(bot.user.username)
            .setTimestamp(message.createdAt);
        message.channel.send(shop)
    }
    else if(args[0] === "7") {
        let xp = db.get(`xp__${message.author.id}`)
        if(xp < 250) return message.channel.send(`<:cancel:534298578311708692>Erreur vous n'avez pas assez d'argent.`)
        db.substract(`xp__${message.author.id}`, 250)
        db.add(`money__${message.author.id}`, 1000)
        message.channel.send('<:confirm:534355831982915609>Vous avez bien acheté l\'xp -> money')

    }


}

module.exports.help = {
    name: "shop"
}