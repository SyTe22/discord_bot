const Discord = require("discord.js");
const client = new Discord.Client();
module.exports.run = async(client, msg, args) => {
    function fibonacci(num, memo) {
        memo = memo || {};
  
        if (memo[num]) return memo[num];
        if (num <= 1) return 1;
  
        return memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo);
    }
    const max_elem = 1476;
    let szam = args[0];
    szam--;
    if(args[1]){
        msg.channel.send(msg.author.username + ", most akkor melyikre vagy kíváncsi?");
        return;
    }
    if(!args[0]){
        msg.channel.send(msg.author.username + ", meg kell adnod hányadik elemre vagy kíváncsi!");
        return;
    }else if(isFinite(args[0])){
        if(Math.floor(args[0]) === parseInt(args[0])){
            if(szam<-1){
                msg.channel.send(msg.author.username + ", nono ez negatív...");
                return;
            }else{
                if(szam>=max_elem){
                    msg.channel.send(msg.author.username + ", sajnálom, erre nem futotta EU pályázatokból!");
                    return;
                } 
                if(szam==-1){
                    msg.channel.send(msg.author.username + ", a fibonacci számsor 0. eleme: 0.");
                    return;
                }
                if(szam<max_elem){
                    let fibonacci_szam = fibonacci(szam);
                    msg.channel.send(msg.author.username + `, a fibonacci számsor ${Math.floor(args[0])}. eleme: ${fibonacci_szam}.`);
                    return;
                }
            }
        }else{
            msg.channel.send(msg.author.username + ", ugye te sem szereted a törteket? Jó mert én sem...");
            return;
        }
    }else{
        msg.channel.send(msg.author.username + ", légyszives számformátumban add meg, máskülönben nem tudok segíteni!");
        return;
    }  
}

exports.settings = {
    show: true,
    category: 0,
    name: 'fibonacci',
    aliases: ['fibo', 'f'],
    description: 'Egy és 1400 között megnézheted a Fibonacci számsor elemeit!',
    usage: 'fibonacci',
    permissions: false
}