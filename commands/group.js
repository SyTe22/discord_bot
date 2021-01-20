module.exports.run = async(client, message, args) => {
    try {
        const guild_id = message.guild.id;
        if(args[0] === "ping"){
            const name = args[1];
            db.query("SELECT group_member.user, group_member.tag, group_member.member FROM group_member, groups WHERE groups.guildID = ? AND groups.group_name = ? AND groups.id = group_member.id;", [guild_id, name], (error, rows) => {
                const user = rows.find(member => member.user === message.author.id && member.tag == true);
                if(user){
                    let msg = "";
                    rows.forEach(member => {
                        if(member.member == true){
                            msg += `<@${member.user}> `;
                        }
                        if(msg.length > 1970){
                            message.channel.send(msg);
                            msg = "";
                        }
                    });
                    message.channel.send(msg);
                }else{
                    return;
                }
            });
        }else if(args[0] === "list"){
            db.query("SELECT group_name FROM groups WHERE groups.guildID = ?", [guild_id], (error, rows) => {
                let msg = "Groups on server: ";
                rows.forEach(name => {
                    if(msg.length <= 20){
                        msg += name.group_name;
                    }else{
                        msg += ", " + name.group_name;
                    }                    
                    if(msg.length > 1970){
                        message.channel.send(msg);
                        msg = "Groups on server: ";
                    }
                });
                message.channel.send(msg);
            });
        }else if(args[0] === "members"){
            const group_name = args[1];
            db.query("SELECT user FROM group_member, groups WHERE groups.guildID = ? AND groups.group_name = ? AND groups.id = group_member.id;", [guild_id, group_name], (error, rows) => {
                if(!rows){
                    return;
                }
                if(rows.length === 0){
                    return message.channel.send("Hibás group név vagy nem található benne senki!");
                }else{
                    let msg = "Group members: ";
                    rows.forEach(member => {
                        let user = message.guild.members.resolve(member.user);
                        if(msg.length <= 17){
                            msg += user.displayName;
                        }else{
                            msg += ", " + user.displayName;
                        }                    
                        if(msg.length > 1970){
                            message.channel.send(msg);
                            msg = "Group members: ";
                        }    
                    });
                    message.channel.send(msg);
                }
            });
        }else{
            const name = args[0];
            const user_id = message.author.id;
            getmembers(guild_id, name, user_id).then(function(members){
                if(!members){
                    db.query("SELECT id FROM groups WHERE guildID = ? AND group_name = ?;", [guild_id, name], (error, rows) => {
                        if(!rows[0]){
                            return message.channel.send("Nincs ilyen group!");
                        }
                        db.query("INSERT INTO group_member(id, user, tag, member) VALUES(? , ?, ?, ?);", [rows[0].id, user_id, true, true], (error, rows) => {
                            return message.channel.send(message.author.username + " hozzáadva a " + name + " grouphoz!");
                        });
                    });
                }else if(members.tag == true && members.member == true){
                    db.query("DELETE FROM group_member WHERE id = ? AND user = ?;", [members.id, members.user], (error) => {
                        return message.channel.send(message.author.username + " eltávolítva a " + name + " groupból!");
                    });
                }else if(members.tag == false && members.member == true){
                    db.query("UPDATE group_member SET member = ? WHERE id = ? AND user = ?;", [false, members.id, user_id], function(error) {
                        return message.channel.send(message.author.username + " eltávolítva a " + name + " groupból!");
                    });
                }else if(members.member == false){
                    db.query("UPDATE group_member SET member = ? WHERE id = ? AND user = ?;", [true, members.id, user_id], function(error) {
                        return message.channel.send(message.author.username + " hozzáadva a " + name + " grouphoz!");
                    });
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
}    

exports.settings = {
    show: true,
    category: 0,
    name: 'group',
    aliases: [],
    description: 'Hozzáad/elvesz a megadott grouphoz. A **ping** paraméterrel tageled a group tagjait. A **list** segítségével lekérheted a szerveren lévő groupokat. Illetve a **members** kilistázza a megadott group tagjait!',
    usage: 'group <a group neve> / group ping <a group neve> / group list / group members <a group neve>',
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