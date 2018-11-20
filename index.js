'use strict';

// Bootstrapping
const IocRegistry = require('./src/ioc-registry');
const iocRegistry = new IocRegistry();

const ConfigurationManager = require('./src/configuration-manager');
const configurationManager = new ConfigurationManager('./bot-configuration.json');
iocRegistry.registerInstance('configurationManager', configurationManager);

const JsonPersistanceService = require('./src/json-persistance-service');
const jsonPersistanceService = new JsonPersistanceService();
iocRegistry.registerInstance('jsonPersistanceService', jsonPersistanceService);

const ModuleHandler = require('./src/module-handler');
const moduleHandler = new ModuleHandler(iocRegistry);
iocRegistry.registerInstance('moduleHandler', moduleHandler);

const MessageHandler = require('./src/message-handler');
const messageHandler = new MessageHandler(iocRegistry);
iocRegistry.registerInstance('messageHandler', messageHandler);

const Discord = require('discord.js');
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
