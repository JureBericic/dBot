'use strict';

const Discord = require('discord.js');
const botConfiguration = require('./bot-configuration');
const ModuleHandler = require('./src/module-handler');

const client = new Discord.Client();
const botMention = `<@${botConfiguration.clientId}>`;
const moduleHandler = new ModuleHandler();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
    else if (msg.content.startsWith(botMention)) {
        console.log('Mention received.')
        try {
            handleMention(msg);
        } catch (error) {
            console.log('Error happened while handling mention.')
        }
        console.log('Mention handled.')
    }
});

client.login(botConfiguration.botToken);


function handleMention(message) {
    message.reply('hello');
}
