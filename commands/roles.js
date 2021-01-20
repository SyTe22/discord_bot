let  fs = require('fs'); 
module.exports.run = async(client,message, args, settings ) => {
    if(message.member.roles.cache.get(settings.modrole) || message.member.hasPermission(['ADMINISTRATOR'])){
        message.channel.guild.fetch().then( guild => {
            if(args[0] === undefined){
                let theFilter = guild.members.cache.filter( member => (member.roles.cache.map( role => role.name ).length <= 1 ) ).map( member => member.user.tag );
                message.channel.send( theFilter.length + " felhasználónak nincs rangja: ");
                fs.writeFile('members.txt' , theFilter.sort().join("\n"), function (err) {
                    if (err) throw err;
                });
                message.channel.send({files: ['members.txt']});  

            //Ha adott rolet akar megnézni
            }else if(args[0] === "multiple"){
                let theFilter = guild.members.cache.filter( member => (member.roles.cache.map( role => role.name ).length > 2 )).map( member => member.user.tag + "," + member.roles.cache.map(role =>role.name).slice(1).sort());
                message.channel.send( theFilter.length + " felhasználónak van több rangja: ");
                fs.writeFile('members.txt' , theFilter.sort().join("\n"),'utf8', function (err) {
                    if (err) throw err;
                });
                message.channel.send({files: ['members.txt']});              
            }else if(args !== null){
                if(!guild.roles.cache.map( role => role.name.toLowerCase() ).includes( args.join(" ").toLowerCase() )){
                    return message.channel.send("Nincs ilyen rang: `" + args.join(" ") +"`");
                }else{                              
                    let theFilter = guild.members.cache.filter( member => member.roles.cache.map( role => role.name.toLowerCase() ).includes( args.join(" ").toLowerCase() ) ).map( member => member.user.tag );
                    message.channel.send( theFilter.length + " felhasználónak van `" + args.join(" ") + "` rangja: ");
                    fs.writeFile('members.txt' , theFilter.sort().join("\n"), function (err) {
                        if (err) throw err;
                    });
                    message.channel.send({files: ['members.txt']});
                }          
            }
        } );
    }else{
        return message.channel.send("Sajnálom, de nincs jogod hozzá!");
    }
    
}


exports.settings = {
    show: true,
    category: 2,
    name: 'roles',
    aliases: [],
    description: 'Information about roles.',
    usage: 'roles / roles <role name> / roles multiple',
    permissions: false
}
