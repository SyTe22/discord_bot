const Discord = require("discord.js");
//const Canvas = require('canvas');
const path = require('path');
const utils = require("../utils.js");

module.exports = async (client, member) => {
    const settings = client.database[member.guild.id];
    /*
    member.guild.fetchInvites().then(guildInvites => {

        const ei = invites[member.guild.id];
        
        invites[member.guild.id] = guildInvites;
        

        if(settings.log === null && settings.memberlog === null){
            return;
        }else if (settings.memberlog !== null){
            let log = member.guild.channels.cach.get(settings.memberlog);
            if(log === null){
                return;
            }
            invite_log(client, log, member, guildInvites, ei);
        }else if (settings.log !== null){
            let log = member.guild.channels.cache.get(settings.log);
            if (log === null){
                return;
            }
            invite_log(client, log, member, guildInvites, ei);
        }
    });
    */

    
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
            member_add(log, member);
            //canvas(log, member);
        }else if (settings.log !== null){
            let log = member.guild.channels.cache.get(settings.log);
            if (log === null){
                return;
            }
            member_add(log, member); 
            //canvas(log, member);
        }
    }


};

function member_add(log, member){
    let embed = new Discord.MessageEmbed()
        .setColor([25, 227, 163])
        .setAuthor(member.user.username + '#' + member.user.discriminator, member.user.displayAvatarURL())
        .setDescription(`Csatlakozott hozzánk: ${member.user}`)
        .addField("Regisztráció ideje: ", member.user.createdAt.toDateString(),true)
        .addField("Account age", utils.checkDays(member.user.createdAt))
        .setImage(member.user.displayAvatarURL())            
        .addField(`Statusz: `,member.user.presence.status,true)
        .setFooter(" ID: " + member.id + ' | ' + new Date().toLocaleString())
    log.send(embed)
        .catch(console.error);
}

function invite_log(client, log, member, guildInvites, ei){
    // Look through the invites, find the one for which the uses went up.
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    // This is just to simplify the message being sent below (inviter doesn't have a tag property)
    const inviter = client.users.cache.get(invite.inviter.id);

    let embed = new Discord.MessageEmbed()
        .setColor([25, 227, 163])
        .setAuthor(inviter.tag, inviter.displayAvatarURL())
        .setDescription(`<@${inviter.id}>`)
        .addField("Meghívó kód: ", invite.code, true)
        .addField("Használat: ", invite.uses, true)
        .addField("Meghívó időtartama: ", invite.maxAge === 0 ? "Kortlálan"  : "Lejárat: " + invite.expiresAt.toLocaleString('hu-HU'), true)
        .addField("Meghívó maximális használata: ", invite.maxUses === 0 ? "Kortlálan"  : invite.maxUses, true)
        .addField("Meghívott személy: ", member.user, true)     
        .setFooter(" ID: " + inviter.id + ' | ' + new Date().toLocaleString())
    log.send(embed)
        .catch(console.error);
}

async function canvas (log, member){
    const canvas = Canvas.createCanvas(700, 300);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage(path.resolve(__dirname, '../canvas/schema.png'));
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
    //keret
	//ctx.strokeStyle = '#74037b';
    //ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Slightly smaller text placed above the member's display name
    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

    // Add an exclamation point here and below
    ctx.font = '45px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);


    // Pick up the pen
    ctx.beginPath();
    // Start the arc to form a circle
    ctx.arc(125, 125, 75, 0, Math.PI * 2, true);
    // Put the pen down
    ctx.closePath();
    // Clip off the region you drew on
    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	log.send(attachment);

}
