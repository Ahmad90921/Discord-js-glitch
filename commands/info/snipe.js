const discord = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")

module.exports = {
  name: "snipe",
  aliases: ["ms", "messagesnipe"],
  category: "info",
  usage: "(prefix)snipe",
  description: "get deleted message",
  run:async (client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if(prefix == null) {
      prefix = config.DEFAULT_PREFIX
    }
    
    const msg = client.snipes.get(message.channel.id)
    if(!msg) return message.channel.send("nothing deleted message  here")
    const embed = new discord.MessageEmbed()
    .setAuthor(msg.author)
    .setDescription(msg.content)
    if(msg.image)embed.setImage(msg.image)
    
    message.channel.send(embed)
    
    
  }
}