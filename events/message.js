module.exports = async (client, message) => {
    if(message.channel.type === "dm"){
        return;
    }
    if(message.author.bot){
        return;
    }
    let settings = client.database[message.guild.id];
    if(!settings){
        return;
    }
    if(settings.length === 0){
        return;
    }
    msg(settings, message, client)
};

async function msg (settings, message, client){
    if(message.content.length > 2000){
        return;
    }else if (message.content.indexOf(settings.prefix) !== 0){
        let msg = message.content.slice().trim().split(/ +/g);
        if(msg[0].toLowerCase() === 'hello' && msg[1] == null ){
            return message.channel.send(`Hello ${message.member.displayName}! <a:hi:714789371550761041>`);
        }
        if(message.content.toLowerCase().includes("távoktatás")){
            return await message.react('752302842231914577');
        }
        return;
    }else{
        const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        let cmd = client.commands.get(command);
        if (client.commands.has(command)) {
            cmd = client.commands.get(command);
        }else if (client.aliases.has(command)) {
            cmd = client.commands.get(client.aliases.get(command));
        }else if (!cmd) return;
        cmd.run(client, message, args, settings);
    }
}