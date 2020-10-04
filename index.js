const discord = require("discord.js");
const client  = new discord.Client();
require('dotenv').config();

const channels = {
    "voice": "text",
    "633391693801979938": "762435383874813973",
    "760491026074304553": "762001054174281759",
    "624973782829760512": "625047148051955742",
    "624970279260782601": "625026392735612968"
}

client.on("ready", () => console.log("\x1b[32m%s\x1b[0m", `Ready as '${client.user.tag}' (${client.user.id}) | Created by @sysLambda (syslambda.fr) - github.com/sysLambda/Plain-of-Hyrule`));

client.on("message", (message) => {
    if(message.channel.type !== "text" || message.author.bot || !message.content.toLowerCase().startsWith("poh!")) return;

    if(message.content.toLowerCase().startsWith("poh!ping")) {
        message.reply("...").then(m => m.edit(`API: \`${Math.round(client.ws.ping)}ms\`\nTemps de réponse brut (RRT): \`${Math.round(m.createdTimestamp - message.createdTimestamp)}ms\``))
    }
});

client.on("voiceStateUpdate", (arg0, arg1) => {

    if(arg0.channelID && !arg1.channelID && channels[arg0.channelID]) 
        arg0.guild.channels.cache.get(channels[arg0.channelID]).createOverwrite(arg0.member.id, {
            VIEW_CHANNEL: false
        });

    if(!arg0.channelID && arg1.channelID && channels[arg1.channelID])
        arg1.guild.channels.cache.get(channels[arg1.channelID]).createOverwrite(arg1.member.id, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            READ_MESSAGE_HISTORY: true
        });
})

client.login(process.env.TOKEN);