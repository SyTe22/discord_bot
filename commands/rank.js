module.exports.run = async(client, message, args) => {
    
    let user = message.author;
    if(args.length !== 0){
        user = message.mentions.users.first();
        if(!user){
            user = message.guild.members.cache.find(member => member.user.username === args.join(" "));
            if(!user){
                return message.channel.send('Nincs ilyen felhasználó!'); 
            }else{
                user = user.user;
            }
        }
    }else if(!user) return message.channel.send('Nincs ilyen felhasználó!');
    
    if(user.id === "503846752449855488") return message.channel.send(user.username + " rank: **undefined**.");
    if(user.id === "585758532167794688") return message.channel.send(user.username + " rank: -100/10.");
    if(user.id === "597055949311574027") return message.channel.send(user.username + " rank: Nyehh.");
    
    //if(user.id === "334385300631453697") return message.channel.send(user.username + " rank: " + (11 - osztokSzama(message.createdTimestamp, user.discriminator)) + "/10.");
    
    return message.channel.send(user.username + " rank: " + osztokSzama(message.createdTimestamp, user.discriminator) + "/10.");
}    

exports.settings = {
    show: true,
    category: 0,
    name: 'rank',
    aliases: [],
    description: 'Random rank generation.',
    usage: 'rank',
    permissions: false
}

function osztokSzama(msg_time, user_disc) {
    let rank = (Number(Math.floor(msg_time/ 1800000) % 10000) + Number(user_disc)) % 10000;
    let osztok = 0;
    for(let i = 1; i <= rank; i++) {
        if(rank % i === 0) osztok++;
    }
    return Math.floor(osztok / 7 + 1);
}