exports.run = (client, message, args,settings) => {
    if(message.member.roles.cache.get(settings.modrole) || message.member.hasPermission(['ADMINISTRATOR'])){
        cs_id = Number(args[0]);;
        if (isNaN(cs_id)) {
            return message.channel.send("Hibás idt adtál meg!");
        }
        let channel = message.guild.channels.cache.get(args[0]);
        if(!channel){
            return message.channel.send("Nem találtam ilyen channelt!");
        }
        if(channel.type !== "voice"){
            return message.channel.send("Nem voice channelt adtál meg!");
        }
        channel.members.forEach(user => {
            user.voice.setMute(true);
        });
    }else{
        message.channel.send('Sajnálom, de nincs jogod hozzá!');
        return;
    }    

};


exports.settings = {
    show: false,
    category: 2,
    name: 'voicemute',
    aliases: ["vmute"],
    description: 'Mute all member in channel',
    usage: 'voicemute channelid',
    permissions: false
}