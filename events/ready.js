const Discord = require("discord.js");
global.invites = {};
const wait = require('util').promisify(setTimeout);
module.exports = async (client)  => {   
    
    wait(1000)

    await (async() => {
        try {
            db.query("CREATE TABLE IF NOT EXISTS guilds_test (guildID VARCHAR(30), prefix VARCHAR(10), modrole VARCHAR(30), log VARCHAR(30), msglog VARCHAR(30), memberlog VARCHAR(30), channelog VARCHAR(30), rolelog VARCHAR(30), user_groupc BOOL, group_limit INT, PRIMARY KEY(guildID));");
            db.query("SELECT * FROM guilds_test;", function (err, results, fields) {
                if (err){
                    return console.log(err);
                }
                results.forEach(guild =>{
                    client.database[guild.guildID] = {prefix: guild.prefix, modrole: guild.modrole, log: guild.log, msglog: guild.msglog, memberlog: guild.memberlog, channellog: guild.channellog, rolelog: guild.rolelog, user_groupc: guild.user_groupc, group_limit: guild.group_limit};
                })
            });
        } catch (error) {
            console.log(error)
        }
    })();

    client.guilds.cache.forEach(g => {
        g.fetchInvites().then(guildInvites => {
        invites[g.id] = guildInvites;
        });
    });

    console.log("[Bot] \x1b[32mSTART: " + new Date().toLocaleString('hu-HU') + " \x1b[0m" );
    client.user.setPresence("game");
    client.user.setActivity("Javascript")
    //await prefetchChannels(client);
};

async function prefetchChannels(client) {
    console.log("[BOT] Prefetching messages");
    for (let guild of client.guilds) {
        guild = guild[1];
        for (let channel of guild.channels.filter(x => x.fetchMessages !== undefined)) {
            channel = channel[1];
            await channel.fetchMessages({limit: 100});
        }
    }
    console.log("[BOT] Prefetch complete");  
}
