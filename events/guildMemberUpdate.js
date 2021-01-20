const Discord = require('discord.js');
module.exports = async (client, newMember, oldMember) => {
    const settings = client.database[newMember.guild.id];
    if(settings === undefined){
        return;            
    }else{
        if (settings.log === null && settings.memberlog === null){
            return;
        }else if(settings.memberlog !== null){
            let log = newMember.guild.channels.cache.get(settings.memberlog); 
            if (log === null){
                return;
            }
            else if(newMember.nickname != oldMember.nickname){
                return nickname_change(log, oldMember, newMember);
            }
            else if(newMember._roles.length != oldMember._roles.length){
                return role_update(log, newMember, oldMember, message);
            }
        }else if(settings.log !== null){
            let log = newMember.guild.channels.cache.get(settings.log);
            if (log === null){
                return;
            }
            else if(newMember.nickname != oldMember.nickname){
                return nickname_change(log, oldMember, newMember);
            }
            else if(newMember._roles.length != oldMember._roles.length){
                return role_update(log, newMember, oldMember);
            }
        }
    }
};

async function nickname_change(log, oldMember, newMember){
    try{
        const fetchlogs = await oldMember.guild.fetchAuditLogs({
            limit: 1,
            targetType: "USER",
            actionType: "UPDATE",
            action:     "MEMBER_UPDATE",
            target:     oldMember,
        }).then(audit => audit.entries.first());

        if(fetchlogs.targetType === "USER" || fetchlogs.actionType === "UPDATE" || fetchlogs.action === "MEMBER_UPDATE" || fetchlogs.target === user){
            const admin   = fetchlogs.executor;
            const changes = fetchlogs.changes[0];

            let embed = new Discord.MessageEmbed()
                .setColor([25, 227, 163])
                .setAuthor(oldMember.user.tag, oldMember.user.displayAvatarURL())
                .setDescription(`Nickname changed: ${newMember} by ${admin}`)
                .addField("Old:", changes.old !== undefined ? changes.old : oldMember.user.username + " (Original)", true)
                .addField("New:", changes.new !== undefined ? changes.new : oldMember.user.username + " (Original)", true)   
                .setFooter(new Date().toLocaleString())
            log.send(embed)
        }        
    }catch(error){
        console.log(error);
    }
}

async function role_update(log, user){
    try{
        const fetchlogs = await user.guild.fetchAuditLogs({
            limit: 1,
            targetType: "USER",
            actionType: "UPDATE",
            action:     "MEMBER_ROLE_UPDATE",
            target:     user,
        }).then(audit => audit.entries.first());

        if(fetchlogs.targetType === "USER" || fetchlogs.actionType === "UPDATE" || fetchlogs.action === "MEMBER_ROLE_UPDATE" || fetchlogs.target === user){
            const admin = fetchlogs.executor;
            const role  = fetchlogs.changes[0].new[0]

            let str = fetchlogs.changes[0].key === "$add"
                ? `${user} megkapta a(z) \`${role.name}\` rolet ${admin} által!`
                : `${user} meg lett fosztva a(z) \`${role.name}\` roletól ${admin} által!`;

            let embed = new Discord.MessageEmbed()
                .setColor([25, 227, 163])
                .setAuthor(user.user.tag, user.user.displayAvatarURL())
                .setDescription(str)
                .setFooter(new Date().toLocaleString())
            log.send(embed)
        }        
    }catch(error){
        console.log(error);
    }    
    
}