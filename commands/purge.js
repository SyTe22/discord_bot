const Discord = require('discord.js');
module.exports.run = async (client, message, args, settings) => {
    await message.delete();
    if(message.member.roles.cache.get(settings.modrole) || message.member.hasPermission(['ADMINISTRATOR'])){
        if(!args[0]) {
            return message.channel.send("Meg kell adnod, hogy mennyit kívánsz törölni!");
        }
        else if(args[0].length === 18){
            let message_id = Number(args[0]);
            if (isNaN(message_id)) {
                return message.channel.send("Hibás értéket adtál meg!");
            }
            message.channel.messages.fetch(message_id)
            .then(msg => {
                console.log(msg.length)
            })
        }
        //ha direkt mennyiségű törlés
        else if(args[1] === undefined){
            let numberOfMessagesToDelete = Number(args[0]);
            if (isNaN(numberOfMessagesToDelete)) {
                return message.channel.send("Hibás értéket adtál meg!");
            }else if(numberOfMessagesToDelete <= 1){
                return message.channel.send("Kettő és száz között válassz egy számot!");
            }else if(numberOfMessagesToDelete > 100){
                return message.channel.send("Kettő és száz között válassz egy számot!");
            }
            message.channel.messages.fetch({limit: 100})
            .then(msg => { 
                msg = msg.filter(m => !m.pinned).array().slice(0, numberOfMessagesToDelete);
                message.channel.bulkDelete(msg);
            })
            .catch(console.error);
        //ha usertől akar törölni
        }else{
            let member = message.mentions.users.first();
            if(!member){
                return message.channel.send('Sajnálom, de nincs ilyen felhasználó!');
            }
            let numberOfMessagesToDelete = Number(args[0]);
                if (isNaN(numberOfMessagesToDelete)) {
                return message.channel.send(`Hibás értéket adtál meg!`);
            }if(numberOfMessagesToDelete <= 1){
                return message.channel.send("Kettő és száz között válassz egy számot!");
            }else if(numberOfMessagesToDelete > 100){
                return message.channel.send("Kettő és száz között válassz egy számot!");
            }             
            message.channel.messages.fetch({limit: 100})
            .then(msg => {
                const filterBy = member ? member.id : Client.member.id;               
                msg = msg.filter(m => m.author.id === filterBy &&!(m.pinned)).array().slice(0, numberOfMessagesToDelete);
                message.channel.bulkDelete(msg);
            })
            .catch(console.error);
        }
    }else{
        return message.channel.send('Sajnálom, de nincs jogod hozzá!');
    }
    

};

exports.settings = {
    show: true,
    category: 2,
    name: 'purge',
    aliases: [],
    description: 'Delete a number of messages from a channel.',
    usage: 'purge <number>/ purge <number> <@user>',
    permissions: false
}