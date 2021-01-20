const Discord = require("discord.js");
module.exports = async (client, channel) => {
    const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
    const settings = client.database[channel.guild.id];

    if(settings.length === 0){
        return;
    }else if(settings.log === null && settings.channellog === null){
        return;
    }else if(settings.channellog !== null){
        let log = channel.guild.channels.cache.get(settings.channellog); 
        if (log === null){
            return;
        }
        return channel_del(log, channel, entry);
    }else if(settings.log !== null){
        let log = channel.guild.channels.cache.get(settings.log); 
        if (log === null){
            return;
        }
        return channel_del(log, channel, entry);
    }
};

function channel_del(log, channel, entry){
    let embed = new Discord.MessageEmbed()
        .setColor([25, 227, 163])
        .setDescription(`Törölt channel: **${channel.name}**`)
        .addField("Ki: ", entry.executor, true)
        .addField("Típus: ", channel.type, true)
        .setFooter('ID: '+  channel.id + " | " + new Date().toLocaleString())
    log.send(embed)
        .catch(console.error); 
}