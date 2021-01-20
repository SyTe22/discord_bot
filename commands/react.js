module.exports.run = async(client, message, args, settings) => {
    if(message.member.roles.cache.get(settings.modrole) || message.member.hasPermission(['ADMINISTRATOR'])){
        await message.delete();
        if(args.length >12){
            return message.channel.send("Túl sok az emoji!")
        }
        //célchannel meghatározása 
        let channel = message.mentions.channels.first();
        //ha nincs mention, akkor aktuális channel
        if(!channel){
            channel = message.channel;
            if(isNaN(Number(args[0]))){
                return message.channel.send("Hibás üzenet idt adtál meg asd!");
            }
            let  msg = await channel.messages.resolve(args[0]);
            if(!msg){
                return message.channel.send("Nem találtam ilyen idval rendelkező üzenetet a **" + channel.name+ "** channelben!");
            }
            if(msg.author.me){
                return;
            }
            return reactadd(args.slice(1), msg, message);
        }
        //ha van mention
        if(isNaN(Number(args[1]))){
            return message.channel.send("Hibás üzenet idt adtál meg!");
        }
        let  msg = await channel.messages.resolve(args[1]);
        if(!msg){
            return message.channel.send("Nem találtam ilyen idval rendelkező üzenetet a **" + args[0].name+ "** channelben!");
        }
        if(msg.author.me){
            return;
        }
        return reactadd(args.slice(2), msg, message);   
    }else{
        return
    }            
}

exports.settings = {
    show: true,
    category: 2,
    name: 'react',
    aliases: [],
    description: 'React a message with emoji.',
    usage: 'react <#channel> <emoji>',
    permissions: false

}

function reactadd(args, msg, message){
    if(!args[0]){
        return message.channel.send("Nem adtál meg ilyen emojit"); 
    }
    for(let i = 0; i<args.length;i++){
        let emoji = args[i];
        if(emoji.length > 10){
            var patt1 = /<([\w]+)?:([\w_: \d]+):([\d]+)>/;
            let eid = (emoji.match(patt1));
            if(msg.guild.emojis.cache.get(eid[3]) === undefined){
                continue;
            }else{
                msg.react(eid[3]);
            }
        }else{
            msg.react(emoji);
        }
    }
}