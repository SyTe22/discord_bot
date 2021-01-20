exports.run = (client, message, args,settings) => {
    if(message.member.roles.cache.get(settings.modrole) || message.member.hasPermission(['ADMINISTRATOR'])){
        const msg = args.join(' ');
        message.delete();
        if(msg.length > 0){
            message.channel.send(msg);
        }
    }else{
        message.channel.send('Sajnálom, de nincs jogod hozzá!');
        return;
    }    

};


exports.settings = {
    show: true,
    category: 2,
    name: 'say',
    aliases: [],
    description: 'The bot repeat your message.',
    usage: 'say <message>',
    permissions: false
}