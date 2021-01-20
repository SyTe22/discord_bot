const Discord = require("discord.js");
let  fs = require('fs'); 
module.exports = async (client, message) => {
    
    let guild = message.entries().next().value[1].channel.guild
    const settings = client.database[guild.id];
    const entry = await guild.fetchAuditLogs({type: 'MESSAGE_BULK_DELETE'}).then(audit => audit.entries.first())
    
    if(settings.length === 0){
        return;            
    }else{
        if (settings.log === null && settings.msglog === null){
            return;
        } else if (settings.msglog !== null){
            let log = guild.channels.cache.get(settings.msglog);
            if(log === null){
                return;
            }
            bulk_delete(message, log, entry, guild);
        }else if (settings.log !== null){
            let log = guild.channels.cache.get(settings.log);
            if (log === null){
                return;
            }
            bulk_delete(message, log, entry, guild);
        }
    }
};

async function bulk_delete (message, log, entry, guild){  
    let uzenetek = new Array();
    message.forEach(message => {
        let url = message.attachments.map(attachment => attachment.proxyURL);
        if(url.length > 0 && url !== null){
            uzenetek.push(message.author.username + " üzenete: " + message.content + " link(ek): " + url)
        }else{
            uzenetek.push(message.author.username + " üzenete: " + message.content)
        }
    });
    uzenetek = uzenetek.reverse();
    fs.writeFile('bulkdelete.txt' , uzenetek.join("\n"),'utf8', function (err) {
        if (err) throw err;
    });
    
    let embed = new Discord.MessageEmbed()
        .setColor([25, 227, 163])
        .setDescription("Bulk Message Delete")
        .setAuthor(guild.name, guild.iconURL())
        .addField('Hol: ', entry.target , true)
        .addField('Mennyit: ', message.size , true)    
        .setFooter(new Date().toLocaleString('hu-HU'))
        
    if(uzenetek.length >0 && uzenetek.join(" ").length <= 1000){
        embed.addField(`Üzenetek:`, `${uzenetek.join("\n")}`)
    }else if(uzenetek.length >0 && uzenetek.join("\n").length > 1000){
        embed.addField(`Üzenetek:`, `${uzenetek.join("\n").slice(0,1000)}...`)
    }
    log.send(embed)
        .catch(console.error);
    log.send({files: ['bulkdelete.txt']});   
}