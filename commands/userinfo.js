const Discord = require("discord.js");
const moment = require("moment");
const utils = require("../utils.js");

module.exports.run = async(client, message, args) => {
    message.channel.guild.fetch().then( guild => {
        let user = message.author;
        if(args.length !== 0){
            user = message.mentions.users.first();
            if(!user){
                user = message.guild.members.cache.find(member => member.user.username === args.join(" "));
                if(!user){
                    return message.channel.send('Bocsi, de nincs ilyen felhasználó!'); 
                }else{
                    user = user.user;
                }
            }
        }else if(!user){
            message.channel.send('Bocsi, de nincs ilyen felhasználó!');
        }
        let roles  = guild.members.cache.get(user.id).roles.cache.sort((A, B) => A.name - B.name ).map(role => role).filter(role => role.name !== '@everyone');
        let users  = guild.members.cache.sort((A, B) => A.joinedAt - B.joinedAt).map(member => member.id);
        let member = message.guild.members.cache.get(user.id);

        let description = "";
        for (let i = 0; i < user.presence.activities.length; i++) {
            let activity = user.presence.activities[i];
            
            switch (activity.type) {
                case "CUSTOM_STATUS":
                    if (activity.emoji && activity.emoji.name) description += activity.emoji.name;
                    if (activity.state)                        description += (description === "" ? "" : " ") + activity.state;
                    break;
                case "PLAYING":
                    if (activity.name)                         description += (description === "" ? "" : "\n") + "**Playing:** "   + activity.name;
                    break;
                case "STREAMING":
                    if (activity.name)                         description += (description === "" ? "" : "\n") + "**Streaming:** " + activity.name;
                    break;
                case "LISTENING":
                    if (activity.name)                         description += (description === "" ? "" : "\n") + "**Listening:** " + activity.name;
                    break;
                case "WATCHING":
                    if (activity.name)                         description += (description === "" ? "" : "\n") + "**Watching:** "  + activity.name;
                    break;
            }
        }

        let embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(user.tag, user.displayAvatarURL())
            .setThumbnail(user.avatarURL())
            .addField("STATUS",         utils.statusTitles[user.presence.status], true)
            .addField("JOIN POSITION",  users.indexOf(user.id)+1 + "/" + users.length, true)
            .addField("DESCRIPTION",    description === "" ? "none" : description, true)
            .addField("JOINED AT",      member.joinedAt.toLocaleString("en-EN") + " (" + utils.checkDays(member.joinedAt) +")", true)
            .addField("REGISTERED AT",  user.createdAt.toLocaleString("en-EN") + " (" + utils.checkDays(user.createdAt) +")", true)
            .addField("SERVER BOOSTER", member.premiumSince === null ? "none" : member.premiumSince.toLocaleString("en-EN") + " (" + utils.checkDays(member.premiumSince) +")", true)
            .addField(`ROLES (${roles.length})`, roles.length === 0 ? "none" : roles.join(" "))
            .setTimestamp()
            .setFooter("ID: " + user.id)
            
        message.channel.send(embed)
            .catch(console.error);
    });
   

}        

exports.settings = {
    show: true,
    category: 0,
    name: 'userinfo',
    aliases: ['uinfo', 'whois', 'user'],
    description: 'Get user information.',
    usage: 'userinfo/ userinfo <@user>',
    permissions: false
}