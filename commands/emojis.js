const config = require('../settings.json');
var moment = require('moment');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
module.exports.run = async(client, message, args, settings) => {
    var start = new Date()
    var hrstart = process.hrtime()
    let msgcount =0;
    console.log("start")
    //console.log(client)
    /*
    if(message.author.id === config.discord.ownerid){
        let emojis = {};
        for(let channel of message.guild.channels.cache){
            if(channel[1].type === "text"){

                let messages = await channel[1].messages.fetch();
                console.log(messages.size)
            }
        }
    }else{
        return;
    }*/
    /*
    var url = new UrlBuilder()
        .SetPath($"channels/{channelId}/messages")
        .SetQueryParameter("limit", "100")
        .SetQueryParameter("after", afterId)
        .Build();
    */

    //return console.log(client)
    let theUrl = "https://discordapp.com/api";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    console.log(xmlHttp);
        

    const used = process.memoryUsage();
    for (let key in used) {
        console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
    }
    var end = new Date() - start,
    hrend = process.hrtime(hrstart);

    console.info('Execution time: %dms', end);
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);

    console.log("Msg: " + msgcount)

}

exports.settings = {
    show: false,
    category: 2,
    name: 'emojis',
    aliases: [],
    description: 'Kilistázza az emojik számát a szerveren',
    usage: 'emojis',
    permissions: false
}