const commando = require('discord.js-commando');
const miru = new commando.Client();
const ytdl = require('ytdl-core');

// miru.registry.registerGroup('random', 'Random');
// miru.registry.registerComandsIn(__dirname + "/commands");
miru.on('ready', () => {
    //SET ACTIVITY
    miru.user.setActivity("with JavaScript");
});

//MIRU LOGIN
miru.login('API KEY')
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

//PONG MESSAGE
miru.on('message', async message => {
    console.log('Miru is ready');
    const args = message.content.split(' ');

    if(message.content === 'ping') {
        message.channel.sendMessage('**PONG!!**');
    }
    if(message.content === 'ding') {
        message.channel.sendMessage('**DONG!!**');
    }
    if(message.content === 'never gonna give you up') {
        message.channel.sendMessage('🎵 **never gonna let you down** 🎵');
    }

    let PREFIX = 'Miru.';
    if(message.content.startsWith(`${PREFIX}play`)) {
        const voiceChannel = message.member.voiceChannel;
        //NEEDS TO BE IN VOICE CHANNELS
        if(!voiceChannel) {return message.channel.sendMessage('I\'m sorry but you need to be in a voice channel');}
        //MAKE SURE PERMISSIONS ARE MET
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if(!permissions) {return message.channel.sendMessage('I\'m sorry but you don\'t have the proper permissions');}
        //SPEAK
        if(!permissions.has('SPEAK')) {return message.channel.sendMessage('I can\'t speak!');}

        //PLAY MUSIC
        try {
            var connection = await voiceChannel.join();
        } catch (error) {
            console.error('I could not join the voice channel because: ' + error);
            return message.channel.sendMessage('I could not join the voice channel because: ' + error);
        }

        const dispatcher = connection.playStream(ytdl(args[1]))
            .on('and', () => {
                console.log('song ended');
                voiceChannel.leave();
            })
            .on('error', error => {
                console.log(error);
            });
            //SET VOLUME
            dispatcher.setVolumeLogarithmic(5 / 5);
    }
});