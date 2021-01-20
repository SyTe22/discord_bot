const Discord = require("discord.js");
module.exports = async(client, oldUser, newUser) => {
    client.guilds.cache.forEach(guild => {
        if(guild.members.cache.get(oldUser.id) === undefined) return;
        const settings = client.database[guild.id];
        if(settings === undefined){
            return;
        }else{
            if (settings.log === null && settings.memberlog === null){
                return;
            }else if(settings.memberlog !== null){
                let log = client.channels.cache.get(settings.memberlog);
                if (log === null){
                    return;
                }
                else if(oldUser.username !== newUser.username){
                    users(log, oldUser, newUser);
                }
            }else if(settings.log !== null){
                let log = client.channels.cache.get(settings.log);
                if(log === null){
                    return;
                }
                else if(oldUser.username !== newUser.username){
                    users(log, oldUser, newUser);
                }
            }
        }
    });
    if(oldUser.username !== newUser.username){
        getusernames(oldUser).then(function(usernames){
            if(usernames === undefined){
                var json_names = JSON.stringify([oldUser.username])
                db.query("INSERT INTO usernames(userID, user) VALUES(?, ?);", [oldUser.id, json_names], function(err) {
                    if (err) {
                        console.log(err.message);
                    }
                });
            }else{
                let names = usernames.user;
                if(names.indexOf(oldUser.username) == -1) {
                    names.push(oldUser.username);
                    let json_names = JSON.stringify(names);
                    db.query("UPDATE usernames SET user = ? WHERE userID = ?;", [json_names, oldUser.id], function(err) {
                        if (err) {
                            console.log(err.message);
                        }
                    });
                }
            }
        }).catch((err) => setImmediate(() => { console.log(err); }));
    }
};

function users (log, oldUser, newUser){
    let embed = new Discord.MessageEmbed()
        .setColor([25, 227, 163])
        .setDescription(`Username changed: ${newUser}!`)
        .setAuthor(newUser.username + '#' + newUser.discriminator, newUser.displayAvatarURL())
        .addField('Régi:',`${oldUser.username}#${oldUser.discriminator}`, true)
        .addField('Új', `${newUser.username}#${newUser.discriminator}`, true)              
        .setFooter(new Date().toLocaleString())
    log.send(embed)
        .catch(console.error); 
}

function getusernames (user){
    return new Promise(function(resolve, reject){
        db.query("SELECT user FROM usernames WHERE userID = ?;", [user.id], (err, rows) => {
            if(err){
                return reject(err);
            }
            resolve(rows[0]);  
        });
    });
}