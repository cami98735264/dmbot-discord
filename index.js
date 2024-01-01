const dotenv = require('dotenv');
dotenv.config(); // Load .env file
const { Client } = require('discord.js-selfbot-v13');
const client = new Client();
let activePool = false;
const minutos = 7;
const ALLOWED_GROUP_ID = process.env.ALLOWED_GROUP;
const TOKEN = process.env.TOKEN;
client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
})

client.on('messageCreate', async (message) => {
        const channel = message.channel;
        if(message.content.toLowerCase().startsWith("/sacar") && channel.type === "GROUP_DM" && channel.id === ALLOWED_GROUP_ID) {
            switch(activePool) {
                case true:
                    channel.send("¡Ya hay una encuesta en curso!");
                    break;
                case false:
                    const mentioned = !message.mentions.users.size ? null : message.mentions.users.first();
                    if(!mentioned) channel.send("¡Debes mencionar a alguno de los miembros del grupo!");
                    else if(mentioned.id === channel.ownerId) channel.send("¡No puedes sacar al dueño del grupo! xdxd");
                    else if(mentioned.id === message.author.id) channel.send("¡No puedes sacarte a ti mismo!");
                    else {
                        activePool = true;
                        const msg = await channel.send("\`¡Poll! - Encuesta\`\n\n¿Están seguros de que quieren sacar a " + "<@" + mentioned.id + ">" + " del grupo?\n\nReacciona con ✅ para confirmar. (_Tienen **" + minutos + "** minuto(s) para responder, se necesitan al menos 4 reacciones positivas_)");
                        msg.react("✅");
                        msg.react("❌");
                        const collectorFilter = (reaction, user) => {
                            return ['✅', '❌'].includes(reaction.emoji.name) && user.id !== client.user.id;
                        };
                        let negativeReactions = 0;
                        let positiveReactions = 0;
                        const collector = msg.createReactionCollector({ filter: collectorFilter, time: 60000 * minutos });
                        collector.on('collect', (reaction, user) => {
                            if(reaction.emoji.name === '✅') {
                                positiveReactions++;
                            }
                            if(reaction.emoji.name === '❌') {
                                negativeReactions++;
                            }
                        })
                        collector.on('end', () => {
                            activePool = false;
                            if(negativeReactions >= 4) {
                                channel.send("¡La encuesta ha sido rechazada!");
                            }
                            else if(positiveReactions >= 3) {
                                channel.send("¡La encuesta ha sido aprobada!");
                                channel.removeMember(mentioned);
            
                            }
                            else {
                                channel.send("¡La encuesta ha sido rechazada por falta de votos!");
                            }
                        });
                    };
                    break;
            }
        }
        if(message.content.startsWith("/eval")) {
            const args = message.content.split(" ").slice(1);
            if(message.author.id !== process.env.OWNERID) return;
            try {
                const code = args.join(" ");
                let evaled = eval(code);
                if (typeof evaled !== "string")
                  evaled = require("util").inspect(evaled);
                channel.send(evaled, {code:"xl"});
              } catch (err) {
                channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
              }
        }
    })

client.login(TOKEN);