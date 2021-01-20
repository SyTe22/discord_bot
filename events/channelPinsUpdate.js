const Discord = require("discord.js");
module.exports = async (client, channel) => {
    let guild = channel.guild;
    if(!guild){
        return;
    }
    const settings = client.database[guild.id];
    
    let message = await guild.fetchAuditLogs().then(audit => audit.entries.first());
    if(!message){
        return;
    }
    if(settings.length === 0){
        return;            
    }else{
        if(settings.log === null && settings.channellog === null){
            return;
        }else if (settings.msglog !== null){
            let log = guild.channels.cache.get(settings.log);
            
            if(log === null){
                return;
            }else if (message.action === 'MESSAGE_PIN'){                
                return pin(log, message, channel);
            }else if (message.action === 'MESSAGE_UNPIN'){                
                return unpin(log, message, channel);
            }
        }else if (settings.log !== null){
            let log = guild.channels.cache.get(settings.log);

            if (log === null){
                return;
            }else if(message.action === 'MESSAGE_PIN'){
                return pin(log, message, channel);
            }else if(message.action === 'MESSAGE_UNPIN'){
                return unpin(log, message, channel);
            }   
        }
    }
};

//üzenet kitűzése
async function pin (log, message, channel){
    const {executor, target} = message;
    let pinelo = executor;
    let msg = await channel.messages.fetch(message.extra.messageID);
    if(!msg){
        return;
    }else if (pinelo.bot){
        return;
    }
    let url = msg.attachments.map(attachment => attachment.proxyURL);
    let embed = new Discord.MessageEmbed()
        .setColor([0, 166, 146])
        .setDescription("Üzenet kitűzve:")
        .setAuthor(target.username + '#' + target.discriminator, target.displayAvatarURL)
        .addField('Tőle: ',target , true)
        .addField('Ki: ', pinelo, true)
        .addField('Hol: ', channel, true)          
        .setFooter(new Date().toLocaleString())
    
    if(msg.content.length >0 && msg.content.length <=1000){
        embed.addField(`Mit:`, `"${msg.content}"`)
    }else if(msg.content.length >0 && msg.content.length >1000){
        embed.addField(`Mit:`, `"${msg.content.slice(0,1000)}..."`)
    }
    if(url.length > 0 && url !== null){
        embed.addField('URL:', url, true);
    }
    embed.addField('Link:', `[Message](${msg.url})`);
    log.send(embed)
        .catch(console.error);
    
}

//üzenet kitűzés megszüntetése
async function unpin (log, message, channel){
    const {executor, target} = message;
    let msg = await channel.messages.fetch(message.extra.messageID);
    if(!msg){
        return;
    }
    let url = msg.attachments.map(attachment => attachment.proxyURL);
    let embed = new Discord.MessageEmbed()
        .setColor([0, 166, 146])
        .setDescription("Üzenet kitűzés megszüntetése:")
        .setAuthor(target.username + '#' + target.discriminator, target.displayAvatarURL)
        .addField('Tőle:',target , true)
        .addField('Ki: ', executor, true)
        .addField('Hol:', channel, true)    
        .setFooter(new Date().toLocaleString())

    if(msg.content.length >0 && msg.content.length <=1000){
        embed.addField(`Mit:`, `"${msg.content}"`)
    }else if(msg.content.length >0 && msg.content.length >1000){
        embed.addField(`Mit:`, `"${msg.content.slice(0,1000)}..."`)
    }
    if(url.length > 0 && url !== null){
        embed.addField('URL:', url, true);
    }
    embed.addField('Link:', `[Message](${msg.url})`);
    log.send(embed)
        .catch(console.error);
}