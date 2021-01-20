const Discord = require("discord.js");
module.exports = async (client, messageReaction, user) => {
    if(user.bot) return;
    const msg = messageReaction.message;
    const channel = messageReaction.message.channel;
    if (messageReaction.emoji.name === '📌') {
        try{
            if (!msg.pinned && msg.pinnable) {
                msg.pin().catch(e =>{
                    //user.send(e.message + " on " + channel.guild.name + " server in the " + channel.name + ".");
                    log(client, channel);
                });
                pin(user, msg, client);
            }
        }catch(error){
            console.error(error);
        }
    }
};

function log(client, channel){
    const settings = client.database[channel.guild.id];
    if (settings.log !== null){
        let log = channel.guild.channels.cache.get(settings.log);
        if (log === null){
            return;
        }else{
            let embed = new Discord.MessageEmbed()
                .setColor([25, 227, 163])
                .setDescription("Beteltek a pinek!")
                .addField('Hol:',channel , true)        
                .setFooter(new Date().toLocaleString('hu-HU'))
            log.send(embed)
                .catch(console.error);
        }
        
    }
}

function pin(user, msg, client){
    const guild = msg.guild
    const settings = client.database[guild.id];
    let log;
    if(settings.length === 0){
        return;
    }else{
        if(settings.log === null && settings.channellog === null){
            return;
        }else if (settings.msglog !== null){
            log = guild.channels.cache.get(settings.log);
            if(log === null){
                return;
            }
        }else if (settings.log !== null){
            log = guild.channels.cache.get(settings.log);
            if (log === null){
            }
        }
    }

    let url = msg.attachments.map(attachment => attachment.proxyURL);
    let embed = new Discord.MessageEmbed()
        .setColor([0, 166, 146])
        .setDescription("Üzenet kitűzve:")
        .setAuthor(msg.author.username + '#' + msg.author.discriminator, msg.author.displayAvatarURL)
        .addField('Tőle: ', msg.author , true)
        .addField('Ki: ', user, true)
        .addField('Hol: ', msg.channel, true)          
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