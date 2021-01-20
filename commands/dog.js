const Discord = require("discord.js");
const superagent = require("superagent");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
module.exports.run = async(client, message, args) => {
    if(args.length === 0){
        (async () => {
            try {
                let {body} = await superagent.get("https://dog.ceo/api/breeds/image/random");
                if(!{body}) return message.channel.send("Próbáld újra!");
                output (message, body);
            } catch (err) {
                console.log(err)
                return message.channel.send("Eltörted a programot, gratulálok...");
            }
        })()
    }else if(args[0] === "help"){
        getRandomImage(message);
    }else if(args.length !== 0){
        (async () => {
            try {
                let {body} = await superagent.get("https://dog.ceo/api/breed/" + args[0].toLowerCase() + "/images/random");
                if(!{body}) return message.channel.send("Próbáld újra!");
                output (message, body);
            } catch (err) {
                return message.channel.send("Nem találtam **" +  args[0] + "** kutyafajtáról képet, ezért javaslom a **!dog help**en belüli kutyafajták neveivel próbálj keresni!");
            }
        })()
    }
}  

exports.settings = {
    show: true,
    category: 1,
    name: 'dog',
    aliases: [],
    description: 'Get a random dog.',
    usage: 'dog / help / dog_name',
    permissions: false
}

// function to perform a get request
function httpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

// function to get a random image
function getRandomImage(message){
  // get the json from the server
  var json = httpGet('https://dog.ceo/api/breeds/list');

  // decode the json into an array
  var array = JSON.parse(json);
  message.channel.send(array.message.join(", "));
}

function output (message, body){
    let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setImage(body.message)
    message.channel.send(embed)
        .catch(console.error);
}