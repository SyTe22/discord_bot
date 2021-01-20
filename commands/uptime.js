const Discord = require("discord.js");
module.exports.run = async(client, message, args, settings) => {
    message.channel.send("Uptime: " + msToTime(client.uptime));
}

exports.settings = {
    show: true,
    category: 0,
    name: 'uptime',
    aliases: [],
    description: 'Show the bot uptime.',
    usage: 'uptime',
    permissions: false
}

function msToTime(ms) {
    var days, hrs, mins, secs;
    secs = Math.floor(ms / 1000);
    mins = Math.floor(secs / 60);
    secs = secs % 60;
    hrs = Math.floor(mins / 60);
    mins = mins % 60;
    days = Math.floor(hrs / 24);
    hrs = hrs % 24;
    return days + ' days ' + hrs + ' hours ' + mins + ' mins ' + secs + ' secs.';
}
