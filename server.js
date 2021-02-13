const discord = require("discord.js");
const dbd = require("dbd.js");
const db = require("quick.db");
const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const { default_prefix, token } = require("./config.json");

const client = new Client({
  disableEveryone: true
});
//MY COMMAND
client.snipes = new Map();
client.on("messageDelete", function(message, channel) {
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author.tag,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null
  });
});

// Collections
client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
 require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
  console.log(`Hi, ${client.user.username} BOT IS ONLINE!`);

 
  
client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;

  if (!message.content.startsWith(prefix)) return;

  // If message.member is uncached, cache it.
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  // Get the command
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  // HMMMMMMMM
  if (command) command.run(client, message, args);
});

  client.login(token)
});
