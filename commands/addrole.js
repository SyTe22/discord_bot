module.exports.run = async(client, message, args, settings) => {
    if(message.member.roles.cache.get(settings.modrole) || message.member.hasPermission(['ADMINISTRATOR']) ){
        if(!args[0] || !args[1]){
            return message.channel.send("Meg kell adnod hogy kinek és milyen rolet akarsz adni!")
        } 
        let rMember = message.mentions.users.first();
        rMember = message.guild.members.cache.get(rMember.id);

        if(!rMember){
            return message.channel.send ("Sajnálom, de nincs ilyen felhasználó!");
        }
        if(!args[1]){
            return message.channel.send("Add meg a rolet!");
        }
        let gRole = message.guild.roles.cache.find(role => role.name === args.join(" ").slice(23));
        if(!gRole){
            return message.channel.send("Hibás rolet adtál meg!");
        }
        if(rMember.roles.cache.find(role => role.equals(gRole))){
            return message.channel.send("Már rendelkezik ezzel roleval!")
        }
        try{
            await rMember.roles.add(gRole.id);
        }catch(e){
            return message.channel.send("Nincs elég jogosultságom ehhez!") 
        }
    }else{
        return message.channel.send('Sajnálom, de nincs jogod ehhez!');
    }

}

exports.settings = {
    show: true,
    category: 2,
    name: 'addrole',
    aliases: [],
    description: 'Add a user to a role.',
    usage: 'addrole <@user> <role>',
    permissions: false
}