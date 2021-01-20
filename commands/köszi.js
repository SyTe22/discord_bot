module.exports.run = async (client, message, args) => {
    const chanel_id = "611921393289789443";
    if(message.channel.id !== chanel_id) return;

    const role_id = "770338141076062218";
    const options = { weekday: "long", hour: "numeric", minute: "numeric", hour12: false};
    const msg_time = message.createdAt.toLocaleDateString("en-EN", options).split(" ");
    const range = ["18:00", "19:30"];
    const day = "Monday";
    const role = await message.guild.roles.fetch(role_id);
    if(!role) return console.log("Nincs role.");
    if(msg_time[0] === day && msg_time[1] >= range[0] && msg_time[1] <= range[1]){
        message.channel.send(`Hipi-hopi ${role} ${args.join(" ")}`);
    }else{
        message.channel.send("Hétfőn van köszi előadás 18:00-19:30-ig, csak akkor használd!")
    }
}
exports.settings = {
    show: false,
    category: 2,
    name: "köszi",
    aliases: [],
    description: "Köszi role tagelése az előadás ideje alatt. (Ne éljetek vissza vele!)",
    usage: "köszi",
    permissions: false
}