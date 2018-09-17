'use strict';

const Discord = require('discord.js');
const client = new Discord.Client();

const botConfiguration = require('./bot-configuration');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
    else if (msg.content.startsWith(`<@${botConfiguration.clientId}>`)) {
        msg.reply('hello');
        console.log(msg.content);
    }
});

client.login(botConfiguration.botToken);
