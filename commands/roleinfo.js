const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
    if(!args[0]){
        return message.channel.send("Nem adtad meg a role nevét!");
    }
    let role = message.guild.roles.cache.find(role => role.name === args[0]);
    if(role.length === 0){
        return message.channel.send("Nem találtam ilyen rolet!");
    }
    let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .addField("Name:", role.name, true)
        .addField("ID:", role.id, true)
        .addField("Color:", role.hexColor, true)
        .addField("Position:", role.rawPosition, true)
        .addField("Created:", role.createdAt.toLocaleString('hu-HU'), true)
        .addField("Mentionable:", role.mentionable === true ? "Yes" : "No", true)
            
    message.channel.send(embed)
        .catch(console.error);
}


exports.settings = {
    show: true,
    category: 0,
    name: 'roleinfo',
    aliases: [],
    description: 'Get role information.',
    usage: 'roleinfo <rolename>',
    permissions: false
}