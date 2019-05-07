const Discord = require('discord.js');
const miru = new Discord.Client();

miru.on('message', (message) => {
    if(message.content === 'ping') {
        message.channel.sendMessage('pong');
    }
});

miru.login('API KEY')
    .catch((err) => {
        console.log(err);
    });