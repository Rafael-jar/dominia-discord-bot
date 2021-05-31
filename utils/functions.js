const Discord = require("discord.js");
const fs = require("fs");
const snekfetch = require('snekfetch');
const ms = require('ms');
const moment = require('moment')

module.exports.sendGuild = (bot, message, msg, discordId, channelId) => {
        const channel = bot.guilds.get(discordId).channels.get(channelId).send(msg);
}

module.exports.sendChannel = (bot, message, msg, channelId) => {

        let channel = message.guild.channels.filter(r => r.id === channelId)
        if (channel.size === 1) {
                cChannel = bot.guilds.get(message.guild.id).channels.get(channelId).send(msg)
        }
}
module.exports.saveUser = (bot, bdd, users) => {
        let userV = users;
        if (userV.bot == true) return;

        bdd.query(`SELECT * FROM users WHERE discord_id = '${userV.id}'`, (err, rows) => {
                if (err) throw err;

                var sB = new RegExp("`", 'g');
                var sV = new RegExp("'", 'g');

                let sUsernameModif = userV.username;

                let sUsername = sUsernameModif.replace(sV, "").replace(sB, "");

                let uSql;

                if (rows.length < 1) {
                        uSql = `INSERT INTO users (username, discriminator, discord_id, user_avatar_path) VALUES ('${sUsername}', '${userV.discriminator}', '${userV.id}', '${userV.displayAvatarURL}')`
                } else {
                        uSql = `UPDATE users SET username = '${sUsername}', discriminator = '${userV.discriminator}', user_avatar_path = '${userV.displayAvatarURL}' WHERE discord_id = '${userV.id}'`
                }
                bdd.query(uSql);
        });
}


module.exports.setHistorique = (bot, message, bdd, users, moderator, type, raison) => {
        bdd.query(`SELECT * FROM historique`, (err, rows) => {
                if (err) throw err;

                let hSql;

                if (raison) {
                        // Verification Raison 
                        var VerifieOne = new RegExp("`", 'g');
                        var VerifieTwo = new RegExp("'", 'g');

                        let reason = raison.replace(VerifieOne, "").replace(VerifieTwo, "");

                        // Save
                        hSql = `INSERT INTO historique (discord_id, playerId, type, raison, date, moderateur) VALUES ('${message.guild.id}', '${users}', '${type}', '${reason}', '${message.createdAt}', '${moderator}')`
                } else {
                        hSql = `INSERT INTO historique (discord_id, playerId, type, date, moderateur) VALUES ('${message.guild.id}', '${users}', '${type}', '${message.createdAt}', '${moderator}')`

                }
                bdd.query(hSql);
        });
}

module.exports.sendModlogs = (message, bdd, user, type, raison, time) => {
        bdd.query(`SELECT * FROM s_modlogs WHERE discord_id = '${message.guild.id}'`, (err, rows) => {

                if (rows.length < 1) return;
                let statut = rows[0].statut;

                if (statut == 1) {
                        let channel_id = rows[0].channel_id;

                        var modlogsEmbed = new Discord.RichEmbed()
                                .setColor(bot.config.color.discord)
                                .setAuthor(user.displayName, user.displayAvatarURL)
                                .addField('<:policeman:505794725643812866> Membre', user.displayName, true)
                                .addField('<:policeman:505794725643812866> Modérateur', message.member.displayName)
                                .addField('<:globe:506837810863407114> Date', moment(message.createdAt).format("LL"), true)
                                .addField('<:filter:506883067101708324> Raison', message.member.displayName)
                                .setFooter(bot.user.username, bot.user.displayAvatarURL)
                                .setTimestamp();

                        if (time) {
                                modlogsEmbed.addField('<:hourglass:506883066430750723> Temps', ms(ms(time)))
                        }
                        let channel = message.guild.channels.filter(r => r.id === channel_id)
                        if (channel.size === 1) {
                                sChannel = bot.guilds.get(message.guild.id).channels.get(channel_id).send(modlogsEmbed)
                        }
                }
        });
}
module.exports.setStaff = (bot, bdd, message, user, statut, rank, rankBy) => {
        bdd.query(`SELECT * FROM f_staff WHERE discord_id = '${user.id}'`, (err, rows) => {
                if (err) throw err;

                if (rows.length < 1) {
                        uSql = `INSERT INTO f_staff (discord_id, statut, rank, rankBy, joinAt) VALUES ('${user.id}', '${statut}', '${rank}', '${rankBy.id}', '${message.createdAt}')`
                } else {
                        uSql = `UPDATE f_staff SET statut = '${statut}', rank = '${rank}', rankBy = '${rankBy.id}', joinAt = '${message.createdAt}' WHERE discord_id = '${user.id}'`
                }
                bdd.query(uSql);
        });
}

module.exports.setTransction = (bot, bdd, message, author, type, plus, moins, user, article) => {
        bdd.query(`SELECT * FROM transaction WHERE discord_id = '${message.guild.id}' AND playerId = '${author.id}'`, (err, rows) => {
                if (err) throw err;

                if (article) {
                        uSql = `INSERT INTO transaction (discord_id, playerId, type, plus, moins, user, article) VALUES ('${message.guild.id}', '${author.id}', '${type}', '${plus}', '${moins}', '${user.id}', '${article}')`

                } else {
                        if (!user) {
                                uSql = `INSERT INTO transaction (discord_id, playerId, type, plus, moins) VALUES ('${message.guild.id}', '${author.id}', '${type}', '${plus}', '${moins}')`
                        } else {
                                uSql = `INSERT INTO transaction (discord_id, playerId, type, plus, moins, user) VALUES ('${message.guild.id}', '${author.id}', '${type}', '${plus}', '${moins}', '${user.id}')`
                        }
                }
                bdd.query(uSql);
        });
}