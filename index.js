const tokenfile = require("./utils/token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const db = require('quick.db')
let prefix = db.get(`prefix`)
fs.readdir("./commands/", (err, files) => {

        if (err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js");
        if (jsfile.length <= 0) {
                console.log("Couldn't find commands.");
                return;
        }

        jsfile.forEach((f, i) => {
                let props = require(`./commands/${f}`);
                console.log(`[COMMANDE] ${f} loaded !`);
                bot.commands.set(props.help.name, props);
        });
});
fs.readdir("./commands/moderation/", (err, files) => {

        if (err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js");
        if (jsfile.length <= 0) {
                console.log("[Moderation] Aucune commande est disponible dans cette catégorie");
                return;
        }
        console.log('-------- Moderation --------')
        jsfile.forEach((f, i) => {
                let props = require(`./commands/moderation/${f}`);
                console.log(`[COMMANDE] ${f} loaded !`);
                bot.commands.set(props.help.name, props);
        });
});
fs.readdir("./commands/economy/", (err, files) => {

        if (err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js");
        if (jsfile.length <= 0) {
                console.log("[Economy] Aucune commande est disponible dans cette catégorie");
                return;
        }
        console.log('-------- Economy --------')
        jsfile.forEach((f, i) => {
                let props = require(`./commands/economy/${f}`);
                console.log(`[COMMANDE] ${f} loaded !`);
                bot.commands.set(props.help.name, props);
        });
});
fs.readdir("./commands/administration/", (err, files) => {

        if (err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js");
        if (jsfile.length <= 0) {
                console.log("[Administration] Aucune commande est disponible dans cette catégorie");
                return;
        }
        console.log('-------- Administration --------')
        jsfile.forEach((f, i) => {
                let props = require(`./commands/administration/${f}`);
                console.log(`[COMMANDE] ${f} loaded !`);
                bot.commands.set(props.help.name, props);
        });
});
fs.readdir("./commands/xp/", (err, files) => {

        if (err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js");
        if (jsfile.length <= 0) {
                console.log("[xp] Aucune commande est disponible dans cette catégorie");
                return;
        }
        console.log('-------- Xp --------')
        jsfile.forEach((f, i) => {
                let props = require(`./commands/xp/${f}`);
                console.log(`[COMMANDE] ${f} loaded !`);
                bot.commands.set(props.help.name, props);
        });
});

bot.on("ready", async () => {
        console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
        bot.user.setActivity(`${prefix}help |  Dominiagames`, {
                type: "PLAYING"
        });
        console.log(`--------- Bot Ready ! -----------`)

        

});

bot.on("message", async message => {
        const panierstaff = message.createReactionCollector((reaction, user) => user.bot === false);

        panierstaff.on('collect', async (reaction, user) => {
                user.users
        })

        if (message.author.bot) return;
        
        let messageArray = message.content.split(" ");
        let args = messageArray.slice(1);

        if (message.author.bot) return;
        if (message.channel.type === "dm") return;


        let prefix = db.get(`prefix`);
        if(prefix === null) prefix = ".";
        let ops = {
                ownerID: 356000515097624577
        }

        if (!message.content.startsWith(prefix)) return;
        let cmd = messageArray[0];
        let commandfile = bot.commands.get(cmd.slice(prefix.length));
        if (commandfile) commandfile.run(bot, message, args, ops);

});
bot.on("message", async message => {
        let xpAdd = Math.floor(Math.random() * 7) + 8;
        let curxp = db.get(`xp__${message.author.id}`)
        let curlvl = db.get(`level__${message.author.id}`)
        if(curxp === null) {
                db.set(`xp__${message.author.id}`, 0)
                db.set(`level__${message.author.id}`, 1)
        }
        if (curxp === null) curxp = 0
        if (curlvl === null) curlvl = 1
        db.add(`xp__${message.author.id}`, xpAdd)
        let xpfinal = xpAdd + curxp

        //let curxp = xp[message.author.id].xp;
        //let curlvl = xp[message.author.id].level;//message.guild.id
        let nxtLvl = curlvl * 300
        if (nxtLvl <= xpfinal) {
                db.add(`level__${message.author.id}`, 1)
                message.author.send(`<:thumbsupa:534294979229515799> Tu es désormais niveau ${curlvl + 1} ! | <:thumbsupa:534294979229515799> You are now to the level ${curlvl + 1} !`)
        }

});

bot.on('emojiCreate', async (emoji) => {
        var emojiCreateLogs = new Discord.RichEmbed()
                .setColor(db.get(`embed`))
                .setDescription(`**Un nouvel émoji a été créé !**\n\n<:${emoji.name}:${emoji.id}>`)
                .setFooter(bot.user.username, bot.user.displayAvatarURL)
                .setTimestamp();
        let logsChannel = bot.channels.get(db.get(`logs`))
        if (!logsChannel) return;

        logsChannel.send(emojiCreateLogs).catch(console.error);
});

bot.on('guildMemberAdd', (member) =>{
        member.addRole(member.guild.roles.find("name", "🎮• Joueur"));
})

bot.on('emojiDelete', async (emoji) => {
        var emojiCreateLogs = new Discord.RichEmbed()
                .setColor(db.get(`embed`))
                .setDescription(`**Un émoji a été suprimé !**\n\n<:${emoji.name}:${emoji.id}>`)
                .setDescription(`<@${member.id}> ${member.displayName}`)
                .setFooter(bot.user.username, bot.user.displayAvatarURL)
                .setTimestamp();
        let logsChannel = bot.channels.get(db.get(`logs`))
        if (!logsChannel) return;

        logsChannel.send(emojiCreateLogs).catch(console.error);
});

bot.on('messageDelete', async (message) => {
        var msgdeleteLogs = new Discord.RichEmbed()
                .setColor(db.get(`embed`))
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription(`**Un message de <@${message.author.id}> a été supprimé dans le salon <#${message.channel.id}> !**\n ${message.content}`)
                .setFooter(bot.user.username, bot.user.displayAvatarURL)
                .setTimestamp();
        if (message.author.id == '456455592769486848') return;
        let logsChannel = bot.channels.get(db.get(`logs`))
        if (!logsChannel) return;
        logsChannel.send(msgdeleteLogs).catch(console.error);
});

bot.on('guildMemberAdd', function (member) {
        var BvnEmbedLogs = new Discord.RichEmbed()
                .setColor(db.get(`embed`))
                .setThumbnail(member.user.displayAvatarURL)
                .setAuthor('Nouveau membre !', member.user.displayAvatarURL)
                .setDescription(`<@${member.id}> ${member.displayName}`)
                .setFooter(bot.user.username, bot.user.displayAvatarURL)
                .setTimestamp();
        let logsChannel = bot.channels.get(db.get(`logs`))
        if (!logsChannel) return;

        logsChannel.send(BvnEmbedLogs);
});

bot.on('guildMemberRemove', function (member) {
        var EmbedQuitteLogs = new Discord.RichEmbed()
                .setColor(db.get(`embed`))
                .setThumbnail(member.user.displayAvatarURL)
                .setAuthor('Un membre en moins !', member.user.displayAvatarURL)
                .setDescription(`<@${member.id}> ${member.displayName}`)
                .setFooter(bot.user.username, bot.user.displayAvatarURL)
                .setTimestamp();
        let logsChannel = bot.channels.get(db.get(`logs`))
        if (!logsChannel) return;
        logsChannel.send(EmbedQuitteLogs);

});



bot.login("NTMyOTQzNDc4NDQzNzM3MTA3.XDdkSg.jAWm5pWrm_-76z3EVCSPTaQx-aI");