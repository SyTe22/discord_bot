const Discord = require("discord.js");
const config = require('../settings.json');
module.exports.run = async(client, message, args, settings) => {
    if(message.member.roles.cache.get(settings.modrole) || message.member.hasPermission(['ADMINISTRATOR']) ){
        if(!args[0]){
            return message.channel.send("Meg kell adnod a channelt!");
        }
        if(!message.guild.me.hasPermission(["MANAGE_CHANNELS", "ADMINISTRATOR"])){
            return message.channel.send("Nincs jogom ehhez!")
        }
        let gchannel = message.mentions.channels.first();
        if(!gchannel){
            return message.channel.send("Nem találtam ilyen channelt!");
        }

        let role = message.guild.roles.cache.find(role => role.name === "@everyone");

        let ow = gchannel.permissionOverwrites.get(role.id);
        
        let permissions = getPermName(ow.deny.bitfield)
        
        if(permissions.find(permission => permission === "SEND_MESSAGES") === undefined){
            return message.channel.send("Nincs némítva a channel!");
        }else{
            try{
                ow.update({
                    'SEND_MESSAGES': null,
                })
                .then(() =>{
                    let embed = new Discord.MessageEmbed()
                        .setTitle(gchannel.name + " némítása megszüntetve!")
                    message.channel.send(embed)
                        .catch(console.error);
                });
            }catch(e){
                console.log(e);
            }
        }
    }else{
        return message.channel.send('Sajnálom, de nincs jogod ehhez!');
    }
} 

exports.settings = {
    show: false,
    category: 2,
    name: 'channelunmute',
    aliases: [],
    description: 'Unmute a channel!',
    usage: 'channelunmute <#channel>',
    permissions: false
}

function getPermName(bitfield) {
    let permissions = [];
    for (let value in Discord.Permissions.FLAGS) {
        if ((bitfield & Discord.Permissions.FLAGS[value]) !== 0) {
            permissions.push(value);
        }
    }
    return permissions;
}