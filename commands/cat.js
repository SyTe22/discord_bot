const Discord = require("discord.js");
const superagent = require("superagent");
const querystring = require("query-string");
const r2 = require("r2");

module.exports.run = async(client, message, args) => {
    
    message.channel.send(await getImage());   
}  

exports.settings = {
    show: true,
    category: 1,
    name: 'cat',
    aliases: [],
    description: 'Get a random cat.',
    usage: 'cat',
    permissions: false
}
 
async function getImage() {
    const CAT_API_URL = "https://api.thecatapi.com/";
    const CAT_API_KEY = "b7734597-14eb-48c7-be78-5dbdfdc2ed1c";

    var headers = {
        'X-API-KEY': CAT_API_KEY,
    }

    var query_params = {
        'mime_types':'jpg,png',
        'size':'med',
        'limit' : 1
    }

    let queryString = querystring.stringify(query_params);

    try{
        let _url = CAT_API_URL + `v1/images/search?${queryString}`;
        var response = await r2.get(_url , {headers} ).json
    }catch(e){
        console.log(e);
    }
    return response[0].url;
}