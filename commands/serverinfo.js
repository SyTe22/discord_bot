const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
    

    let online = message.guild.members.cache.filter(member => member.presence.status === 'online').size;
    let idle = message.guild.members.cache.filter(member => member.presence.status === 'idle').size
    let offline = message.guild.members.cache.filter(member => member.presence.status === 'offline').size
    let dnd = message.guild.members.cache.filter(member => member.presence.status === 'dnd').size
    let g_user = message.guild.memberCount-message.guild.members.cache.filter(member => member.user.bot).size;
    let g_bot = message.guild.members.cache.filter(member => member.user.bot).size;
    let g_catergies = message.guild.channels.cache.filter(channel => channel.type === 'category').size;
    let g_text = message.guild.channels.cache.filter(channel => channel.type === 'text').size;
    let g_voice = message.guild.channels.cache.filter(channel => channel.type === 'voice').size;


    let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(message.guild.name, message.guild.iconURL())
        .addField("Owner:", message.guild.owner, true)
        .addField("Region:", region[message.guild.region], true)
        .addField("Server Created", message.guild.createdAt.toLocaleDateString() + " (" + checkDays(message.channel.guild.createdAt) +")", true )
        .addField("Verification Level", message.guild.verificationLevel, true)
        .addField("Nitro Level: ", message.guild.premiumTier, true)
        .addField("Booster count: ", message.guild.premiumSubscriptionCount, true)
        .addField("Members:",`Total members: ${message.guild.memberCount}\nHumans: ${g_user}\nOnline: ${online + dnd + idle}\nBots: ${g_bot}`, true)
        .addField("Channels",`Total channels: ${message.guild.channels.cache.size}\nCategories: ${g_catergies}\nText: ${g_text}\nVoice: ${g_voice}`, true)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp(new Date())
        .setFooter("ID: " + message.guild.id)
    message.channel.send({embed});

}


exports.settings = {
    show: true,
    category: 0,
    name: 'serverinfo',
    aliases: [],
    description: 'Get server info/stats.',
    usage: 'serverinfo',
    permissions: false
}

function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    let months = Math.floor(days / 30);
    days = days % 30;
    let years = Math.floor(months / 12);
    months = months % 12;
    return (years === 0 ? "" : years + (years === 1 ? " year " : " years ")) + (months === 0 ? "" : months + (months === 1 ? " month " : " months "))  + (days === 0 ? "" : days + (days === 1 ? " day " : " days ")) + "ago"
};

let region = {
    "brazil": ":flag_br: Brazil",
    "eu-central": ":flag_eu: Central Europe",
    "singapore": ":flag_sg: Singapore",
    "us-central": ":flag_us: U.S. Central",
    "sydney": ":flag_au: Sydney",
    "us-east": ":flag_us: U.S. East",
    "us-south": ":flag_us: U.S. South",
    "us-west": ":flag_us: U.S. West",
    "eu-west": ":flag_eu: Western Europe",
    "vip-us-east": ":flag_us: VIP U.S. East",
    "london": ":flag_gb: London",
    "amsterdam": ":flag_nl: Amsterdam",
    "hongkong": ":flag_hk: Hong Kong",
    "russia": ":flag_ru: Russia",
    "southafrica": ":flag_za:  South Africa"
};