module.exports = async (client, guild) => {
    try{
        db.query("CREATE TABLE IF NOT EXISTS guilds_test (guildID BIGINT, prefix VARCHAR(10), modrole BIGINT, log BIGINT, msglog BIGINT, memberlog BIGINT, channelog BIGINT, rolelog BIGINT, user_groupc BOOL, group_limit INT, PRIMARY KEY(guildID));");
        db.query("INSERT INTO guilds_test (guildID, prefix, user_groupc, group_limit) VALUES(?, ?, ?, ?);", [guild.id, process.env.prefix, false, process.env.group_limit], function(err) { 
            console.log(`A ${guild.name} ${guild.id} idval hozzáadva az adatbázishoz!`);
        });
        if(!client.database[guild.id]){
            client.database[guild.id] = {prefix: "!", modrole: null, log: null, msglog: null, memberlog: null, channellog: null, rolelog: null, user_groupc: false, group_limit: process.env.group_limit};
        }
    }catch(e){
        console.log(e);
    }
};