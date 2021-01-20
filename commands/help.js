const Discord = require("discord.js");
exports.run =async (client, message, params, settings) => {
    /*
    let perm = 0;
    if(message.member.roles.cache.get(settings.modrole) || message.member.hasPermission(['ADMINISTRATOR'])){
        perm = 1;
    }
    if (!params[0]) {
        const commandNames = Array.from(client.commands.keys());
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
        const commands = client.commands.filter(c => c.conf.permLevel <= perm);
        message.channel.send(`= Command List =\n\n[Use ${settings.prefix}help <commandname> for details]\n\n${commands.map(c => `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} : ${c.help.description}`).join('\n')}`, {code:'asciidoc'});
    } else {
        
        let command = params[0];
        if (client.commands.has(command)) {
            command = client.commands.get(command);
            if(command.conf.permLevel <= perm){
                message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:${command.help.usage}`, {code:'asciidoc'});
            }
        
        }
    }
    */
    
    if(params.length === 0){
        //kategória szerint sorrendbe rendezve kerülnek a commandok
        let commands = client.commands.sort(function(a,b) {return (a.settings.category - b.settings.category)})

        if(commands.length < 1) return;
        //a commandok kategóriája
        let category = {
            0: "Misc",
            1: "Pictures", 
            2: "Manager",
            3: "Moderation",
        };

        //az embed színe
        const color = "#2edb88"

        //az embedek alapja, könnyek sokszorosítható
        const embed = {
            embed: {
                color: color,
                title: "",
                fields: [],
                footer: {
                    text: "",
                },
            }
        }
        let pages = [];
        let page_number = 1;
        try {
            let page = await new_embed(color);
            //let page = JSON.parse(JSON.stringify(embed));
            page.embed.footer.text = `Page: ${page_number}.`;
            for (const command of commands) {
                const cmd_settings = command[1].settings;
                if (!cmd_settings) continue;
                if (cmd_settings.show) {
                    if(page.embed.fields.length === 10) {
                        pages.push(page);
                        page_number++;
                        page = await new_embed(color);
                        //page = JSON.parse(JSON.stringify(embed));
                        page.embed.footer.text = `Page: ${page_number}.`;
                    }
                    if(page.embed.fields.length < 10){
                        let cmd_category = category[cmd_settings.category]
                        if(Number(page.embed.title.length) === 0) page.embed.title = cmd_category;
                        if(page.embed.title !== cmd_category) {
                            pages.push(page);
                            page_number++;
                            page = await new_embed(color);
                            //page = JSON.parse(JSON.stringify(embed));
                            page.embed.footer.text = `Page: ${page_number}.`;
                        }
                        page.embed.fields.push({
                            name:
                                settings.prefix +
                                cmd_settings.name,
                            value: cmd_settings.description,
                        });
                    }
                }
            };
        } catch (error) {
            console.log(error);
        };
        try {
            let currentPage  = 0;
            let msg = await message.channel.send(pages[currentPage ]);
            await msg.react("◀").catch(console.error);
            await msg.react("❌").catch(console.error);
            await msg.react("▶").catch(console.error);
            const handler = async (emoji, user)=>{
                if(user.bot) return;
                let ename = emoji.emoji.name;
                let message = emoji.message;
                
                if(message.id === msg.id && !message.deleted){
                    if(ename === "◀"){
                        if(!msg.deleted){
                            currentPage -= 1;
                            if (currentPage < 0) currentPage = 0;
                            await message.edit(pages[currentPage]);
                            await emoji.users.remove(user);
                        }
                    }else if(ename === "❌"){
                        client.off('messageReactionAdd', handler);
                        delete handler;
                        setTimeout(() => {
                            message.delete().catch(console.error);
                        }, 1000)                
                        return;
                    }else if(ename === "▶"){
                        if(!msg.deleted){
                            currentPage += 1;
                            if (currentPage > pages.length - 1) {
                                currentPage = pages.length - 1;
                            }
                            await message.edit(pages[currentPage]);
                            await emoji.users.remove(user);
                        }
                    }
                }
            };
            client.on('messageReactionAdd', handler);
            setTimeout(() => {
                client.off('messageReactionAdd', handler);
                delete handler;
            }, 150000); 
        } catch (error) {
            throw error;
        }
    }else {
        let command = params[0];
        if (client.commands.has(command)) {
            let embed = new Discord.MessageEmbed()  
            command = client.commands.get(command);
            embed
                .setColor('#2edb88')
                .setTitle(command.settings.name)
                .setDescription(command.settings.description)
                .addField("Használat", command.settings.usage)    
            message.channel.send(embed)   
        }
        
    }
};

exports.settings = {
    show: false,
    category: 0,
    name: 'help',
    aliases: ['h', 'halp', 'command', 'commands'],
    description: 'Displays all the available commands.',
    usage: 'help [command]',
    permissions: false

}

async function new_embed (color){
    const embed = {
        embed: {
            color: color,
            title: "",
            fields: [],
            footer: {
                text: "",
            },
        }
    }
    return embed;
}