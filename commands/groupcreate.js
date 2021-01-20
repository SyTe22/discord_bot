module.exports.run = async(client, message, args, settings) => {
    if(message.member.roles.cache.get(settings.modrole) || message.member.hasPermission(['ADMINISTRATOR']) || settings.user_groupc == true){
        try{
            //Ellenőrzi az inputokat
            const name = args[0];
            if(name.length > 30){
                return message.channel.send("30 karakternél rövidebb nevet adj meg!");
            }
            const blacklist = ["delete", "rename", "ping", "take", "give", "list"];            
            if(blacklist.includes(name)){
                return message.channel.send("Nem lehet a group neve **" + name + "**!");
            }           
            if(name.length <= 0) return message.channel.send("Nem adtad meg a group nevét!")
            const guild_id = message.guild.id;

            //Table létrehozása
            db.query("CREATE TABLE IF NOT EXISTS groups (id int NOT NULL AUTO_INCREMENT, guildID BIGINT, group_name VARCHAR(30), PRIMARY KEY(id, guildID, group_name));");
            db.query("CREATE TABLE IF NOT EXISTS group_member (id int NOT NULL, user VARCHAR(30), tag BOOL, member BOOL, PRIMARY KEY(id, user))");

            //Group létrehozása
            db.query("SELECT COUNT(id) AS groups FROM groups WHERE guildID = ?;", [guild_id], (error, rows) =>{
                if(rows[0].groups >= settings.group_limit){
                    return message.channel.send("Nem hozhatsz létre több groupot a szerveren!");   
                }else{
                    db.query("SELECT * FROM groups WHERE guildID = ? AND group_name = ?;", [guild_id, name], (error, rows) => {
                        if(rows[0]){
                            return message.channel.send("Már létezik "  + name + " group!");
                        }else{
                            db.query("INSERT INTO groups(guildID, group_name) VALUES(?, ?);", [guild_id, name], (error) =>{             
                                return message.channel.send("Sikeresen létrehoztad a " + name + " groupot!");                    
                            });
                        }
                    });
                }
            });
            
        }catch(error){
            return console.log(error);
        }
    }else return message.channel.send("Sajnálom, de nincs jogod hozzá!");
}    

exports.settings = {
    show: true,
    category: 0,
    name: 'groupcreate',
    aliases: ['groupc'],
    description: 'Létrehoz egy groupot.',
    usage: 'groupcreate <group name>',
    permissions: false
}