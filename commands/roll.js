const Discord = require("discord.js");
module.exports.run = async(client, message, args) => {

    let dices=[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,22,24,30,32,34,48,50,60,100,120,144];
    let eredmeny = new Array();
    let osszeg = 0;
    let dice = 0;
    let input  = args.join("").split("+");
    if(!args[0]){
        return message.channel.send("Nem adtál meg egyetlen kockát sem!");
    }

    for(let i = 0; input.length > i; i++){
        let count = input[i].trim().split("d")[0];
        let sides = input[i].trim().split("d")[1];
        if(!isFinite(count)){
            return message.channel.send("Csak az egész számokkal tudok mit kezdeni.");
        }else if(!dices.includes(parseInt(sides))){
            return message.channel.send(`Sajnálom de nem létezik **${sides}** oldalú szabályos kocka :cry:`);
        }else if(count >20){
            return message.channel.send("Próbálkozz kevesebb kockákkal!")
        }else if (count === ''){
            count = 1;
        }else if(eredmeny.join("").length >= 1600){
            return message.channel.send("Próbálkozz kevesebb/kisebb kockákkal!")
        }
        dice += parseInt(count);
        while( count-- > 0 ){
            
            let seged = 1 + Math.floor( Math.random() * sides );
            osszeg += seged;
            eredmeny.push(seged + "+");
        }
    }
    eredmeny = eredmeny.join("");
    return message.channel.send("Felhasznált kockák: " + dice + "\nA dobás(ok) eredménye: " + osszeg + "\nA részeredmények: " + eredmeny.slice(0, eredmeny.length-1) + ".");
}
exports.settings = {
    show: true,
    category: 0,
    name: 'roll',
    aliases: [],
    description: 'Roll the dice.',
    usage: 'roll d<number> or <number>d<number>',
    permissions: false
}