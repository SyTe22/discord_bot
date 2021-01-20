const Discord = require("discord.js");
const config = require('../settings.json');
module.exports.run = async(client, message, args, settings) => {
    if(message.member.roles.cache.get(settings.modrole) || message.member.hasPermission(['ADMINISTRATOR']) ){
        if(!args[0]){
            return message.channel.send("Meg kell adnod hogy kit és mért akarsz némítani!");
        }
        if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])){
            return message.channel.send("Nincs jogom ehhez!")
        }
        let user = message.mentions.users.first();
        user = message.guild.members.cache.get(user.id);

        if(!user){
            return message.channel.send("Nem találtam ilyen felhasználót!");
        }


        let time = ido(args[1]);

        if(time === false){
            return message.channel.send("Hibás értéket adtál meg, maximálisan 6 órát adhatsz!");
        }
        if(!time){
            return message.channel.send("Nem adtál meg időt!");
        }

        let reason = args.slice(2).join(" ");
        if(!reason){
            reason = " ";
        }
        let muterole = message.guild.roles.cache.find(role => role.name === "Muted");
        if(!muterole){
            try {
                muterole = await message.guild.roles.create({
                    name: "Muted",
                    color: "#514f48",
                    hasPermission: []
                })
                message.guild.channels.cache.forEach(async (channel, id) => {
                    if(channel.name === "log"){
                        console.log(channel)
                    }
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false, 
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false
                    })
                });
            } catch (error) {
                console.log(error.stack)
            }
        }
        try{
            await user.roles.add(muterole.id).then(() =>{
                user.send("Némítva lettél a " + message.guild.name + " szerveren " + reason + " indokkal!");
            })
        }catch(e){
            console.log(e)
            return message.channel.send("Nincs elég jogosultságom ehhez!") 
        }

        setTimeout(function(){
            try{
                user.roles.remove(muterole.id).then(() => {
                    user.send("Lejárt a némításod a " + message.guild.name + " szerveren!");  
                })
            }catch(e){
                console.log(e)
                return message.channel.send("Nincs elég jogosultságom ehhez!") 
            }
        }, (time));
        
    }else{
        return message.channel.send('Sajnálom, de nincs jogod ehhez!');
    }
}  

exports.settings = {
    show: false,
    category: 3,
    name: 'mute',
    aliases: [],
    description: 'Mute a member!',
    usage: 'mute <@user> <reason>',
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