module.exports.run = async(client, message, args) => {

    message.channel.send("Pinging...").then(m => {
        m.edit("Pong!" + `Bot Latency: \`${m.createdTimestamp - message.createdTimestamp} ms\`, API Latency: \`${Math.round(client.ws.ping)}\` ms`);
        console.log("asd")
    });


}

exports.settings = {
    show: true,
    category: 0,
    name: 'ping',
    aliases: ['latency'],
    description: 'Get the bot latency.',
    usage: 'panda',
    permissions: false
}