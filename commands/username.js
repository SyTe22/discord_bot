const Discord = require("discord.js");
const fs = require('fs');
module.exports.run = async (client,message, args, settings) => {
    if(message.member.roles.cache.get(settings.modrole) || message.member.hasPermission(['ADMINISTRATOR']) ){

        if(!args[0]){
            return message.channel.send("Meg kell adnod hogy kiről szeretnél információt!")
        }
        user = message.guild.members.cache.find(member => member.user.username === args.join(" "));
        if(!user){
            return message.channel.send('Bocsi, de nincs ilyen felhasználó!'); 
        }
        if(!user){
            return message.channel.send("Nincs ilyen felhasználó!")
        }
        try {
            db.query("SELECT user FROM usernames WHERE userID = ?", [user.id] ,(err, row) =>{
                if(err){
                    console.log(err.message);
                }
                if(row.length === 0){
                    message.channel.send("Nincs ismert username a felhasználótól!");
                }else if(row[0].user.length <= 1000){
                    let names = row[0].user;
                    let embed = new Discord.MessageEmbed()
                        .setColor([25, 227, 163])
                        .setDescription(`Username info: ${user}!`)
                        .setAuthor(user.user.username + '#' + user.user.discriminator, user.user.displayAvatarURL())
                        .addField('Usernames:',names, true)             
                        .setFooter(new Date().toLocaleString())
                    message.channel.send(embed)
                        .catch(console.error);
                }else{
                    let names = JSON.parse(row.user);
                    fs.writeFile('usernames.txt' , names, 'utf8', function (err) {
                        if (err) throw err;
                    });
                    message.channel.sendFile('usernames.txt');
                } 
            });
        } catch (error) {
            console.log(error)
        }
    }
}

exports.settings = {
    show: true,
    category: 2,
    name: 'username',
    aliases: ['usernames'],
    description: 'A felhasználó korábbi ismert usernevei.',
    usage: 'username <@user>',
    permissions: false
}