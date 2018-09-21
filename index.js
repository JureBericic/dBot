'use strict';

const Discord = require('discord.js');

// Bootstrapping
const ConfigurationManager = require('./src/configuration-manager');
const IocRegistry = require('./src/ioc-registry');
const MessageHandler = require('./src/message-handler');
const ModuleHandler = require('./src/module-handler');

const iocRegistry = new IocRegistry();

const configurationManager = new ConfigurationManager('./bot-configuration.json');
iocRegistry.registerInstance('configurationManager', configurationManager);

const moduleHandler = new ModuleHandler();
iocRegistry.registerInstance('moduleHandler', moduleHandler);

const messageHandler = new MessageHandler(iocRegistry);
iocRegistry.registerInstance('messageHandler', messageHandler);

const client = new Discord.Client();
const botMention = `<@${configurationManager.clientId}>`;

// Configuration of responses to client events
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

let callSignal = `<@${configurationManager.clientId}>`;

client.on('message', msg => messageHandler.processMessage(msg));

// Start the bot and login
client.login(configurationManager.botToken);
