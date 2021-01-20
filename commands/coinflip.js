const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    let dobas = Math.floor(Math.random()*2)+1;
    if(dobas === 1){
        message.channel.send(message.author.username + ", the throw results: **heads**.");
        return;
    }
    else{
        message.channel.send(message.author.username + ", the throw results: **tails**.");
    }
}     

exports.settings = {
    show: true,
    category: 0,
    name: 'coinflip',
    aliases: ['flip', 'cflip'],
    description: 'Flip a coin!',
    usage: 'coinflip',
    permissions: false
}