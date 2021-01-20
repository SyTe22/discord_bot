const Discord = require("discord.js");
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

        let time = ido(args[1]);

        if(time === false){
            return message.channel.send("Hibás értéket adtál meg, maximálisan 6 órát adhatsz!");
        }
        if(!time){
            return message.channel.send("Nem adtál meg időt!");
        }
        let role = message.guild.roles.cache.find(role => role.name === "@everyone");

        let ow = gchannel.permissionOverwrites.get(role.id);
        
        let permissions = getPermName(ow.deny.bitfield)
        
        if(permissions.find(permission => permission === "SEND_MESSAGES") === 'SEND_MESSAGES'){
            return message.channel.send("Már némítva van a channel!");
        }else{
            try{
                ow.update({
                    'SEND_MESSAGES': false,
                })
                .then(() =>{
                    let embed = new Discord.MessageEmbed()
                        .setTitle(gchannel.name + " channel némítva lett " + args[1] + " időre!")
                    message.channel.send(embed)
                        .catch(console.error);
                });
            }catch(e){
                console.log(e);
            }
            
            setTimeout(function(){
                try{
                    ow.update({
                        'SEND_MESSAGES': null,
                    })
                    .then(() =>{
                        let embed = new Discord.MessageEmbed()
                            .setTitle("Lejárt " + gchannel.name + " channel némítása!")
                        message.channel.send(embed)
                            .catch(console.error);
                    });
                }catch(e){
                    console.log(e)
                }
            }, (time));
        }
    }else{
        return message.channel.send('Sajnálom, de nincs jogod ehhez!');
    }
}  

exports.settings = {
    show: false,
    category: 2,
    name: 'channelmute',
    aliases: [],
    description: 'Mute a channel!',
    usage: 'channelmute <#channel> <time>',
    permissions: false
}


function ido (time){
    let formatum = time.slice(time.length-1).toString();
    let ido = time.slice(0, time.length-1);

    //max time 6h || 360m
    if(formatum !== "m" && formatum !== "h"){
        return false;
    }
    else if(formatum === "m"){
        if(ido <= 360){
            return parseInt(ido*60*1000);
        }else{
            return false;
        }
    }else if(formatum === "h"){
        if(ido <=6){
            return parseInt(ido*60*60*1000);
        }else{
            return false;
        }
    }
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