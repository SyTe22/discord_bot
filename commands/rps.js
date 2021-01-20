const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    let dobas = Math.floor(Math.random()*3)+1;
    let dontetlen = 'Döntetlen, sok sikert a következő játékhoz!';
    let nyertel = 'Gratulálok a győzelemhez!';
    let vesztettel = 'Sajnálom, de ez most nem jött össze!';
    let hiba = message.author.username + ", " + "Sajnos hibás a választásod, kérlek válassz mást!";
    let elemek = ['olló', 'ollo', 'scissors', 'kő', 'kö', 'rock', 'papír', 'papir', 'paper'];    
    if(!args[0]){
        message.channel.send("Kérlek add meg, hogy mit szeretnél választani!");
        return;
    }
    if(elemek.includes(args[0])){
         
            //olló
            if(dobas == 1){
                if(args[0] == 'olló' || args[0] == 'ollo' || args[0] == 'scissors'){
                    return message.channel.send(message.author.username + ", " + dontetlen);
                }
                else if(args[0] == 'kő' || args[0] == 'kö' || args[0] == 'rock'){
                    return message.channel.send(message.author.username + ", " + nyertel);
                }
                else{
                    return message.channel.send(message.author.username + ", " + vesztettel);
                }
            }
            //kő
            else if(dobas == 2){
                if(args[0] == 'olló' || args[0] == 'ollo' || args[0] == 'scissors'){
                    return message.channel.send(message.author.username + ", " + vesztettel);
                }
                else if(args[0] == 'kő' || args[0] == 'kö' || args[0] == 'rock'){
                    return message.channel.send(message.author.username + ", " + dontetlen);
                }
                else{
                    return message.channel.send(message.author.username + ", " + nyertel);
                }
            
            }
            //papír
            else if(dobas == 3){
                if(args[0] == 'olló' || args[0] == 'ollo' || args[0] == 'scissors'){
                    return message.channel.send(message.author.username + ", " + nyertel);
                }
                else if(args[0] == 'kő' || args[0] == 'kö' || args[0] == 'rock'){
                    return message.channel.send(message.author.username + ", " + vesztettel);
                }
                else{
                    return message.channel.send(message.author.username + ", " + dontetlen);
                }
            }
        
    }else{
        return message.channel.send(hiba);
            
    }
    
}

exports.settings = {
    show: true,
    category: 0,
    name: 'rps',
    aliases: [],
    description: 'Rock Paper Scissors with the bot.',
    usage: 'rps <rock>/ <scissors>/ <paper>',
    permissions: false
}