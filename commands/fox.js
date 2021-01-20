const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(client, message, args) => {
    let {body} = await superagent
    .get(`https://some-random-api.ml/img/fox`)
    if(!{body}) return message.channel.send("Próbáld újra!");
    let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        //.setTitle("Ölelés:")
        .setImage(body.link)
    message.channel.send(embed)
        .catch(console.error); 
}   

exports.settings = {
    show: true,
    category: 1,
    name: 'fox',
    aliases: [],
    description: 'Get a random dog.',
    usage: 'fox',
    permissions: false
}