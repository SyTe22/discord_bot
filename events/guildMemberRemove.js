const Discord = require("discord.js");
module.exports = async (client, member) => {
    const settings = client.database[member.guild.id];
    if(!settings){
        return;
    }
    if(settings.length === 0){
        return;            
    }else{
        if(settings.log === null && settings.memberlog === null){
            return;
        }else if (settings.memberlog !== null){
            let log = member.guild.channels.cach.get(settings.memberlog);
            if(log === null){
                return;
            }
            return member_remove(log, member); 
        }else if (settings.log !== null){
            let log = member.guild.channels.cache.get(settings.log);
            if (log === null){
                return;
            }
            return member_remove(log, member); 
        }

    }
};

function member_remove(log, member){
    let embed = new Discord.MessageEmbed()
        .setColor([25, 227, 163])
        .setAuthor(member.user.username + '#' + member.user.discriminator, member.user.displayAvatarURL())
        .setDescription(`Itt hagyott minket: ${member.user}`)
        .addField("Regisztráció ideje: ", member.user.createdAt.toDateString(),true)
        .setImage(member.user.displayAvatarURL())
        .setFooter(new Date().toLocaleString() + " ID: " + member.id)
    log.send(embed)
        .catch(console.error); 
}