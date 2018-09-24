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

const moduleHandler = new ModuleHandler(iocRegistry);
iocRegistry.registerInstance('moduleHandler', moduleHandler);

const messageHandler = new MessageHandler(iocRegistry);
iocRegistry.registerInstance('messageHandler', messageHandler);

const client = new Discord.Client();
iocRegistry.registerInstance('client', client);

// Load all modules.
for (let moduleName of configurationManager.loadOnStart) {
    moduleHandler.loadModule(moduleName);
}

// Configuration of responses to client events
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => messageHandler.processMessage(msg));

// Start the bot and login
client.login(configurationManager.botToken);
