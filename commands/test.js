const Discord = require("discord.js");
const config = require('../settings.json');
module.exports.run = async (client, message, args, settings) => {

    console.log(client._events)
    
}
exports.settings = {
    show: false,
    category: 0,
    name: 'test',
    aliases: [],
    description: 'test command.',
    usage: 'test',
    permissions: false
}

function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    let months = Math.floor(days / 30);
    days = days % 30;
    let years = Math.floor(months / 12);
    months = months % 12;
    if(years === 0  && months === 0 && days === 0){
        return "Less than 1 day ago."
    }
    return (years === 0 ? "" : years + (years === 1 ? " year " : " years ")) + (months === 0 ? "" : months + (months === 1 ? " month " : " months "))  + (days === 0 ? "" : days + (days === 1 ? " day " : " days "));
};