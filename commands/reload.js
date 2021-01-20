module.exports.run = async(client, message, args) => {
    
    if(message.author.id !== process.env.ownerid){
        return;
    }else if(!args[0]){
        return message.channel.send("Meg kell adnod, hogy melyik commandot szeretnéd újratölteni!");
    }else{
        let commandName = args[0].toLowerCase();
        try{
            if(client.commands.has(commandName)){
                delete require.cache[require.resolve("./" + commandName + ".js")]
                client.commands.delete(commandName);
            }
            const pull = require("./" + commandName + ".js");
            client.commands.set(commandName, pull);
            console.log("A " + commandName + " command sikeresen újratöltve!");
        }catch(e){
            console.log(e);
            return message.channel.send("Nem tudtam újratölteni a " + commandName + " commandot!");
        }
    }
}

exports.settings = {
    show: false,
    category: 0,
    name: 'reload',
    aliases: [],
    description: 'Reload a bot command.',
    usage: 'reload <command name>',
    permissions: false
}