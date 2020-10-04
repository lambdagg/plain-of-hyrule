const Discord = require('discord.js');
const utils   = require('../utils.js');

/**
 *  @param {Discord.Client} client
 *  @param {Discord.Message} message
 *  @param {string[]} args
 */
exports.run = (client, message, args) => {

    message.reply(
        new Discord.MessageEmbed()
        .setColor("#f39c12")
        .setAuthor(utils.a(message.guild.id, "ping.pinging"), message.author.displayAvatarURL())
        .setTimestamp()
    ).then(m => {
        m.edit("",
            new Discord.MessageEmbed()
            .setColor("#27ae60")
            .setAuthor(utils.a(message.guild.id, "ping.done"), message.author.displayAvatarURL())
            .setDescription(`${utils.a(message.guild.id, "ping.api")}: \`${Math.round(client.ws.ping)}ms\`\n${utils.a(message.guild.id, "ping.restime")}: \`${Math.round(m.createdTimestamp - message.createdTimestamp)}ms\``)
            .setFooter(`${utils.a(message.guild.id, "requestedBy")} ${message.author.tag}`)
            .setTimestamp()
        ).then(msg => msg.delete({timeout:10000}))
    })
}

exports.infos = {
    permission: undefined,
    permission_delete: false,
    permission_silent: false
}