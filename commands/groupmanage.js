module.exports.run = async(client, message, args, settings) => {
    if(message.member.roles.cache.get(settings.modrole) || message.member.hasPermission(['ADMINISTRATOR'])){
        const command = args[0].toLowerCase();
        const commands = ["delete", "rename", "take", "give"];
        if(!commands.includes(command)){
            return message.channel.send("Hibás paramétert adtál meg!");
        }else{
            const new_name = args[2];
            if(new_name.length > 30){
                return message.channel.send("30 karakternél rövidebb nevet adj meg!");
            }
            const blacklist = ["delete", "rename", "ping", "take", "give", "list"];
            if(blacklist.includes(new_name)){
                return message.channel.send("Nem lehet a group neve **" + new_name + "**!");
            }
            const guild_id = message.guild.id;
            const name = args[1];
            let user;
            switch(command){
                case "delete":
                        db.query("SELECT groups.id FROM groups WHERE groups.guildID = ? AND groups.group_name = ?;", [guild_id, name], (error, rows) => {
                            if(error) return console.log(error);
                            db.query("DELETE FROM group_member WHERE id = ?;", [rows[0].id], (error) => {
                                if(error) return console.log(error);
                            });
                        });
                        db.query("DELETE FROM groups WHERE guildID = ? AND group_name = ?;", [guild_id, name], (error) => {
                            if(error) return console.log(error);
                        });
                    break;                
                case "rename":
                    db.query("UPDATE groups SET group_name = ? WHERE guildID = ? AND group_name = ?;", [new_name, guild_id, name], (error) => {
                        if(error) return console.log(error);
                    });
                    break;
                case "take":
                    user = message.mentions.users.first();
                    if(!user) return message.channel.send("Nem adtad meg a usert!");
                    db.query("UPDATE group_member, groups SET group_member.tag = ? WHERE group_member.user = ? AND groups.guildID = ? AND groups.group_name = ? AND group_member.id = groups.id;", [false, user.id, guild_id, name], (error) => {
                        if(error) return console.log(error);
                    });
                    break;   
                case "give": 
                    user = message.mentions.users.first();
                    if(!user) return message.channel.send("Nem adtad meg a usert!");
                    db.query("UPDATE group_member, groups SET group_member.tag = ? WHERE group_member.user = ? AND groups.guildID = ? AND groups.group_name = ? AND group_member.id = groups.id;", [true, user.id, guild_id, name], (error) => {
                        if(error) return console.log(error);
                    });
                    break;         
                default:
            }
        }
        try{
            
        }catch(error){
            return console.log(error);
        }
    }else return message.channel.send("Sajnálom, de nincs jogod hozzá!");
}    

exports.settings = {
    show: true,
    category: 2,
    name: 'groupmanage',
    aliases: ['groupm'],
    description: 'Törölheted a groupot, szerkesztheted a tagok tagelési jogosultságait, illetve a nevét módosíthatod.',
    usage: 'groupmanage <delete> <name>/ <take> <mentioned user>/ <give> mentioned user>/ <rename> <old name> <new name>',
    permissions: false
}

function getmembers (guild_id, group_name, user_id){
    return new Promise(function(resolve, reject){
        db.query("SELECT groups.id, group_member.user, group_member.tag, group_member.member FROM group_member, groups WHERE groups.guildID = ? AND groups.group_name = ? AND groups.id = group_member.id AND group_member.user = ?;", [guild_id, group_name, user_id], (err, rows) => {
            if(err){
                return reject(err);
            }
            resolve(rows[0]);
        });
    });
}