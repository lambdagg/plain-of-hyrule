'use strict';

// process.env
require('dotenv').config();

// Basic constants
const Discord = require("discord.js");
const client  = new Discord.Client();

// Array mapping as "voice" : "text"
const channels = {
    "760491026074304553": "762001054174281759",
    "624973782829760512": "625047148051955742",
    "624970279260782601": "625026392735612968"
}

client.on("ready", () => {
    console.log("\x1b[32m%s\x1b[0m", `Ready as '${client.user.tag}' (${client.user.id}) | Created by @sysLambda (syslambda.fr) - github.com/sysLambda/Plain-of-Hyrule`);
    // Reset permissions in channels
    for(const id in channels) {
        client.channels.cache.get(channels[id]).overwritePermissions([{id:client.channels.cache.get(channels[id]).guild.roles.everyone,deny:['VIEW_CHANNEL'], allow:['SEND_MESSAGES','READ_MESSAGE_HISTORY']}], 'Reset').then(() => {
            client.channels.cache.get(id).guild.members.cache.filter(m => m.user.bot).map(m => client.channels.cache.get(channels[id]).createOverwrite(m.id, {VIEW_CHANNEL:true}));
            client.channels.cache.get(id).members.map(m => client.channels.cache.get(channels[id]).createOverwrite(m.id, {VIEW_CHANNEL:true}));
        });
    }
});

// Process our commands (not the cleanest way but la flemme yk)
client.on("message", (message) => {
    if(message.channel.type !== "text" || message.author.bot || !message.content.toLowerCase().startsWith("poh!")) return;
    if(message.content.toLowerCase().startsWith("poh!ping ") || message.content.toLowerCase(). === "poh!ping") {
        message.reply("...").then(m => m.edit(`API: \`${Math.round(client.ws.ping)}ms\`\nTemps de réponse brut (RRT): \`${Math.round(m.createdTimestamp - message.createdTimestamp)}ms\``))
    }
});

// Our main event, listening for voice updates (mute, deaf, join, leave, etc etc)
client.on("voiceStateUpdate", (old, new) => {
    if(old.channelID && !new.channelID && channels[old.channelID] && !old.member.user.bot) 
        old.guild.channels.cache.get(channels[old.channelID]).permissionOverwrites.get(old.member.id).delete();
    if(!old.channelID && new.channelID && channels[new.channelID] && !new.member.user.bot)
        new.guild.channels.cache.get(channels[new.channelID]).createOverwrite(new.member.id, {VIEW_CHANNEL: true});
});

// Connect our bot to Discord
client.login(process.env.TOKEN);