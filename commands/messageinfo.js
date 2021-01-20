module.exports.run = async(client, message, args) => {
    if(message.author.id !== config.discord.ownerid){
        return;
    }
    let channel = message.mentions.channels.first();
    if(channel.length < 0){
        return message.channel.send("Nem adtál meg channelt!");
    }else{
        if(isNaN(Number(args[0]))){
            return message.channel.send("Hibás üzenet idt adtál meg!");
        }
        let  msg = await channel.messages.fetch(args[0]);
        if(!msg){
            return message.channel.send("Nem találtam ilyen idval rendelkező üzenetet a **" + channel.name+ "** channelben!");
        }
        if(msg.author.me){
            return;
        }
        msg.reactions.cache.forEach(emoji => {
            console.log(emoji._emoji.name, emoji._emoji.id)
        });
    }
       
} 

exports.settings = {
    show: false,
    category: 3,
    name: 'messageinfo',
    aliases: ['msginfo'],
    description: 'Get a message information.',
    usage: 'messageinfo <messageid> <channel>',
    permissions: false
}