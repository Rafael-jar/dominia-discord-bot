const Discord = require("discord.js");


// emojis

var yes = '<:yes:546777258397007923>';
var no = '<:no:546777258338156554>';

// Errors

module.exports.noPerms = (message, perm) => {
        message.reply(`${no} Il te manque la permissions ❱ **\`${perm}\`**`);
}

module.exports.botNoPerms = (message, perm) => {
        message.reply(`${no} Je n'ai pas la permission ❱ **\`${perm}\`**`);
}

module.exports.equalPerms = (message, user, perms) => {
        message.reply(`${no} ${user.displayName} a des **permissions** !`);
}

module.exports.botuser = (message) => {
        message.reply(`${no}  Tu ne peux pas sanctionné un bot !`);
}

module.exports.notOp = (message) => {
        message.reply(`${no} Tu n'est pas \`OP\` pour pouvoir effectuer cette commande !`);
}

module.exports.cantfindUser = (message) => {
        message.reply(`${no} Impossible de trouver cet utilisateur !`);
}

module.exports.noReason = (message) => {
        message.reply(`${no} Tu dois indiquez une raison !`);
}

module.exports.errorPerso = (message, msginfo) => {
        message.reply(`${no} ${msginfo}`);
}

module.exports.noPermission = (message) => {
        message.reply(`${no} Vous n'avez pas la permission d'utiliser cette commande`);
}

module.exports.error = (message) => {
        message.reply(`${no} Commande interrompue, une erreur viens d'apparaître !`);
}

module.exports.notMp = (message, user) => {
        message.reply(`<:warning:505794726771949575> **${user.displayName}** n'a pas été averti car ses message privés sont fermés !`).then(m => m.delete(5000));
}

// Successful

module.exports.successful = (message, phrase) => {
        message.reply(`${yes} ${phrase}`);
}

module.exports.successfulDelete = (message, phrase) => {
        message.reply(`${yes} ${phrase}`).then(m => m.delete(5000));
}

module.exports.successfulError = (message, phrase) => {
        message.reply(`${no} ${phrase}`);
}

module.exports.successfulErrorDelete = (message, phrase) => {
        message.reply(`${no} ${phrase}`).then(m => m.delete(5000));
}

module.exports.usage = (message, commande, phrase) => {
        message.reply(`${phrase}`);
        return;
}