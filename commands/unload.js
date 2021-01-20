const Discord = require("discord.js");
const config = require('../settings.json');
module.exports.run = async(client, message, args) => {
    
    if(message.author.id !== config.discord.ownerid){
        return;
    }else if(!args[0]){
        return message.channel.send("Nem adtál meg command nevet!");
    }else{
        let commandName = args[0].toLowerCase();
        try{
            delete require.cache[require.resolve("./" + commandName + ".js")]
            client.commands.delete(commandName);
            console.log("A " + commandName + " command sikeresen törölve!");
        }catch(e){
            console.log(e)
            return message.channel.send("Nem sikerült törölni a **" + commandName + "** commandot!");
        }
    }
}

exports.settings = {
    show: false,
    category: 0,
    name: 'unload',
    aliases: [],
    description: 'Unload a bot command.',
    usage: 'unload <command name>',
    permissions: false
}