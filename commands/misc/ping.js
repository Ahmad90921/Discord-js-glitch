module.exports = {
  name: "ping",
  category: "misc",
  description: "Get bot ping :/",
  usage: "ping",
  run: (client, message, args) => {
    message.channel.send("**Pong**").then((sentMessage) => sentMessage.edit(`**Pong**: ${client.ws.ping}ms`))
  }
  
}
