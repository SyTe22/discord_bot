const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(client, msg, args) => {
    let {body} = await superagent
    .get(`https://some-random-api.ml/img/birb`)
    if(!{body}) return msg.channel.send("Próbáld újra!");
    let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        //.setTitle("Birb:")
        .setImage(body.link)
    msg.channel.send(embed)
        .catch(console.error); 
}    

exports.settings = {
    show: true,
    category: 1,
    name: 'bird',
    aliases: [],
    description: 'Get a random bird.',
    usage: 'bird',
    permissions: false
}