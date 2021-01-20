const Discord = require("discord.js");
module.exports.run = async(client, message, args, settings) => {
    let user = message.author;
    if(args.length !== 0){
        user = message.mentions.users.first();
        if(!user){
            user = message.guild.members.cache.find(member => member.user.username === args.join(" "));
            if(!user){
                return message.channel.send('Bocsi, de nincs ilyen felhasználó!'); 
            }else{
                user = user.user;
            }
        }
    }else if(!user){
        message.channel.send('Bocsi, de nincs ilyen felhasználó!');
    }
    let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(user.username + "#" + user.discriminator)    
        .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
    message.channel.send(embed)
        .catch(console.error);
        
        

}

exports.settings = {
    show: true,
    category: 0,
    name: 'avatar',
    aliases: [],
    description: "Get a user's avatar.",
    usage: 'avatar / avatar <@user> / avatar <username>',
    permissions: false
}