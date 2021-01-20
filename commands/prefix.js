const Discord = require("discord.js");
module.exports.run = async(client, message, args, settings) => {

    if(message.member.roles.cache.get(settings.modrole) || message.member.hasPermission(['ADMINISTRATOR']) ){
        if(args.length === 0){
            return message.channel.send('Meg kell adnod az új prefixet!');
        }else if(args.length > 10){
            return message.channel.send('Maximum tíz karakter lehet a prefix!');
        }else if(args[0] === settings.prefix){
            return message.channel.send('Megegyezik a jelenlegi prefixxel!');
        }else{
            dbiras(args[0], message.guild.id, client, message);
        }
    }else{
        return message.channel.send('Sajnálom, de nincs jogod hozzá!');
    }
}


exports.settings = {
    show: true,
    category: 2,
    name: 'prefix',
    aliases: [],
    description: 'Change the prefix.',
    usage: 'prefix <new prefix>',
    permissions: false
}

function dbiras (prefix, id, client, message){
    try{
        db.query("UPDATE guilds_test SET prefix = ? WHERE guildID = ?;", [prefix, id]);
        client.database[message.guild.id].prefix = prefix;
        message.channel.send("Az új prefix **" + prefix + "** lett!");
    }catch(e){
        console.log(e);
    }
}