const Discord = require("discord.js");
module.exports = async (client, message) => {
    
    if(message.author.bot) return;
    const settings = client.database[message.guild.id];

    const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())

    if(settings.length === 0){
        return;            
    }else{
        if (settings.log === null && settings.msglog === null){
            return;
        } else if (settings.msglog !== null){
            let log = message.guild.channels.cache.get(settings.msglog);
            if(log === null){
                return;
            }
            msg_delete(message, log, entry);
        }else if (settings.log !== null){
            let log = message.guild.channels.cache.get(settings.log);
            if (log === null){
                return;
            }
            msg_delete(message, log, entry);
        }
    }
};

async function msg_delete (message, log, entry){
    let url = message.attachments.map(attachment => attachment.proxyURL);
    let user = ""
        if (entry.extra.channel.id === message.channel.id
        && (entry.target.id === message.author.id)
        && (entry.createdTimestamp > (Date.now() - 5000))
        && (entry.extra.count >= 1)) {
        user = entry.executor; 
    }else { 
        user = message.author;
    }
    let embed = new Discord.MessageEmbed()
        .setColor([25, 227, 163])
        .setDescription("Üzenet törlése:")
        .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL())
        .addField('Tőle:',message.author , true)
        .addField('Ki:', user, true)
        .addField('Hol:', message.channel, true)         
        .setFooter(message.createdAt.toLocaleString())
    if(message.cleanContent.length > 0 && message.cleanContent.length <= 1000){
        embed.addField(`Mit:`, `"${message.cleanContent}"`)
    }else if(message.cleanContent.length > 0 && message.cleanContent.length > 1000){
        embed.addField(`Mit:`, `"${message.cleanContent.slice(0,1000)}..."`)
    }
    if(url.length > 0 && url !== null){
        embed.addField('URL:', url);
        //embed.addField('URL', `[Link](${url})`);
    }
    if(message.reference){
        const reference = message.reference;
        const channel = message.guild.channels.resolve(reference.channelID);
        let msg, url;
        if(channel){
           msg = await channel.messages.resolve(reference.messageID); 
        }
        if(msg){
            url = msg.url;
        }
        if(url){
           embed.addField('Reply:', `[Message](${url})`); 
        }
    }
    log.send(embed)
        .catch(console.error);
}