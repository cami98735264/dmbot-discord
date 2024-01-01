const dotenv = require('dotenv');
dotenv.config(); // Load .env file
const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
})

client.on('messageCreate', async (message) => {
    if(message.content.startsWith("/sacar")) {
        // Check if message has any mentions
        if(!message.mentions.users.size) {
            return message.channel.send("¡Debes mencionar a alguno de los miembros del grupo!");
        }
        else if(message.mentions.users.first().id === message.author.id) {
            return message.channel.send("¡No puedes sacarte a ti mismo!");
        
        } else {
            const msg = await message.channel.send("\`¡Poll! - Encuesta\`\n\n¿Están seguros de que quieren sacar a " + "<@" + message.mentions.users.first().id + ">" + " del grupo?\n\nReacciona con ✅ para confirmar. (_Tienen 1 minuto para responder, se necesitan al menos 4 reacciones positivas_)");
            msg.react("✅");
            msg.react("❌");
            const collectorFilter = (reaction, user) => {
                return ['✅', '❌'].includes(reaction.emoji.name) && user.id !== client.user.id;
            };
            let negativeReactions = 0;
            let positiveReactions = 0;
            const collector = msg.createReactionCollector({ filter: collectorFilter, time: 60000 * 7 });
            collector.on('collect', (reaction, user) => {
                if(reaction.emoji.name === '✅') {
                    positiveReactions++;
                }
                if(reaction.emoji.name === '❌') {
                    negativeReactions++;
                }
            })
            collector.on('end', () => {
                if(negativeReactions >= 4) {
                    message.channel.send("¡La encuesta ha sido rechazada!");
                }
                else if(positiveReactions >= 3) {
                    message.channel.send("¡La encuesta ha sido aprobada!");
                    message.channel.removeMember(message.mentions.users.first());

                }
                else {
                    message.channel.send("¡La encuesta ha sido rechazada por falta de votos!");
                }
            });
        }
    }
})

client.login(process.env.TOKEN);