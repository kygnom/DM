const Discord = require('discord.js');
const bot = new Discord.Client();
const oncooldown = new Set();

const prefix = "-"

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag} :)`);
    bot.user.setActivity('-dm');
});

bot.on('message', message => {

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let com = command.toLowerCase();
    let args = message.content.slice(prefix.length).split(" ");

    if (message.author.bot || message.channel.type === "dm"){return}

    if (com === `${prefix}dm`) {
        /* Permissions list: {
      ADMINISTRATOR: true,
      CREATE_INSTANT_INVITE: true,
      KICK_MEMBERS: true,
      BAN_MEMBERS: true,
      MANAGE_CHANNELS: true,
      MANAGE_GUILD: true,
      ADD_REACTIONS: true,
      VIEW_AUDIT_LOG: true,
      PRIORITY_SPEAKER: true,
      STREAM: true,
      VIEW_CHANNEL: true,
      SEND_MESSAGES: true,
      SEND_TTS_MESSAGES: true,
      MANAGE_MESSAGES: true,
      EMBED_LINKS: true,
      ATTACH_FILES: true,
      READ_MESSAGE_HISTORY: true,
      MENTION_EVERYONE: true,
      USE_EXTERNAL_EMOJIS: true,
      VIEW_GUILD_INSIGHTS: true,
      CONNECT: true,
      SPEAK: true,
      MUTE_MEMBERS: true,
      DEAFEN_MEMBERS: true,
      MOVE_MEMBERS: true,
      USE_VAD: true,
      CHANGE_NICKNAME: true,
      MANAGE_NICKNAMES: true,
      MANAGE_ROLES: true,
      MANAGE_WEBHOOKS: true,
      MANAGE_EMOJIS: true
    }
    */
        if (!message.member.permissions.has("MANAGE_MESSAGES"))
            return message.channel.send(`You don't have permission to use this command.`);

        // checks if the user in the "oncooldown" set, returns if
        if (oncooldown.has(message.author.id)) {
            return message.reply("Wait 30 seconds before using this command again.");

        } else {
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
                // Adds the user to the set 
            oncooldown.add(message.author.id);
            setTimeout(() => {
                // Removes the user from the set after 30 seconds
                oncooldown.delete(message.author.id);
            }, 30000); //time in ms
        }
    }
})

bot.login('TOKEN');