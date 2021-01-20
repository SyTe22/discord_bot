const Discord = require('discord.js');
exports.run = (client, message, args, settings) => {
    //message.delete();
    var str = message.content;
    const regexp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;\(\)\[\]]*[-A-Z0-9+&@#\/%=~_|\(\)\[\]])(\s|$|'|"|&nbsp;|<)/gi;
    const array = [...str.matchAll(regexp)];
    let links = [];
    for(let i = 0, l = array.length; i < l; i++){
        if(array[i][1] !== undefined) links.push(array[i][1]);
    }
    if(message.attachments){
        let attachments = message.attachments.map(attachment => attachment.proxyURL);
        if(attachments.length > 0){
            message.channel.send(args.join(' '));
            return message.channel.send(attachments);
        }
        else return message.channel.send(args.join(' '));
    }else if(links.length > 0) return message.channel.send(args.join(' '));
    
};


exports.settings = {
    show: true,
    category: 2,
    name: 'send',
    aliases: [],
    description: 'The bot send your url(s) and file(s).',
    usage: 'send <url/file>',
    permissions: false
}