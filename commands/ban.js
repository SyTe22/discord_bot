module.exports.run = async(client, message, args, settings) => {
    if(message.member.roles.cache.get(settings.modrole) || message.member.hasPermission(['ADMINISTRATOR'])){
        let member = message.guild.members.cache.get(message.mentions.users.first().id);
        if(!member){
            return message.channel.send('Sajnálom, de nincs ilyen felhasználó!');
        }try{
            member.ban().then((member) => {
                message.channel.send(":wave: " + member.displayName + " banolva lett!")
            });
        }catch(e){
            return message.channel.send("Nincs elég jogosultságom ehhez!") 
        }
    }else{
        return message.channel.send('Bocsi, de nincs jogod hozzá!');
    } 
}

exports.settings = {
    show: true,
    category: 0,
    name: 'ban',
    aliases: [],
    description: 'Ban a member.',
    usage: 'ban <@user>',
    permissions: false
}
