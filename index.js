const Discord = require('discord.js');
const bot = new Discord.Client();

const prefix = "="

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag} :)`);
});

bot.on('message', message => {

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let com = command.toLowerCase();
    let args = message.content.slice(prefix.length).split(" ");

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    if (com === `${prefix}dm`) {
        if (!message.member.permissions.has("MANAGE_MESSAGES"))
            return message.channel.send(`You don't have permission to use this command.`);
        let user =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[1]);
        if (!user)
            return message.channel.send(
                `You did not mention a user`
            );
        if (!args.slice(2).join(" "))
            return message.channel.send("You did not specify your message");
        user.user
            .send(args.slice(1).join(" "))
            .catch(() => message.channel.send("That user could not be DMed!"))
            .then(() => message.channel.send(`Sent a message to ${user.user.tag}`));
    }
})

bot.login('Njc3ODE3ODAxMTU4Njg4ODA5.XkZxBQ.odY9XWdiWfJA1VIUymqbRmdr4Ds');