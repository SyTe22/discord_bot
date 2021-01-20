const Discord = require("discord.js");
module.exports = async (client, oldChannel, newChannel) => {
    const settings = client.database[oldChannel.guild.id];
    if(!settings){
        return;
    }

    if(settings.length === 0){
        return;
    }else if(settings.log === null && settings.channellog === null){
        return;
    }else if(settings.channellog !== null){
        let log = oldChannel.guild.channels.cache.get(settings.channellog); 
        if (log === null){
            return;
        }
        return channel_update(log, oldChannel, newChannel);
    }else if(settings.log !== null){
        let log = oldChannel.guild.channels.cache.get(settings.log); 
        if (log === null){
            return;
        }
        return channel_update(log, oldChannel, newChannel);
    }
};

function channel_update(log, oldChannel, newChannel){
    try {
        let embed = new Discord.MessageEmbed()
            .setColor([25, 227, 163])
            .setDescription(`Channel updated: **${newChannel.name}**`) 

        if(oldChannel.position !== newChannel.position){
            embed.addField("Position changed: ", "New position: " + newChannel.position, true)
        }
        if(oldChannel.name !== newChannel.name){
            embed.addField("Name changed: ", "New name: " + newChannel.name, true)
        }
        if(oldChannel.type !== newChannel.type){
            embed.addField("Type changed: ", "New type: " + newChannel.type, true)
        }
        if(oldChannel.viewable !== newChannel.viewable){
            embed.addField("Viewable: ", newChannel.viewable, true)
        }
        embed.setFooter('ID: '+  newChannel.id + " | " + new Date().toLocaleString())

        log.send(embed);
    } catch (error) {
        console.log(error);
    }
    
}