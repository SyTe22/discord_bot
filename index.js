const Discord = require('discord.js');
const client = new Discord.Client();
let fs = require("fs");
const mysql = require('mysql2');
require('dotenv').config();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.database = {};

global.db = mysql.createPool({
    host: process.env.DB_host,
	user: process.env.DB_user,
	password: process.env.DB_password,
	database: process.env.DB_database
});

//event loader
fs.readdir('./events/', async (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        //console.log(`Loaded event '${evtName}'`);
        client.on(evtName, evt.bind(null, client));
    });
});

//command loader
fs.readdir('./commands/', async (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/${file}`);
        let cmdName = file.split('.')[0];
        //console.log(`Loaded command '${cmdName}'`);
        client.commands.set(cmdName, props);
        props.settings.aliases.forEach(alias => {
            client.aliases.set(alias, props.settings.name);
        });
    });
});

client.login(process.env.token);