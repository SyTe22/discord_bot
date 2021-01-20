const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(client, msg, args) => {
    let {body} = await superagent
    .get(`https://some-random-api.ml/animu/pat`)
    if(!{body}) return msg.channel.send("Próbáld újra!");
    let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        //.setTitle("Pat:")
        .setImage(body.link)
    msg.channel.send(embed)
        .catch(console.error); 
}

exports.settings = {
    show: true,
    category: 1,
    name: 'dog',
    aliases: [],
    description: 'Get a random pat.',
    usage: 'pat',
    permissions: false
}