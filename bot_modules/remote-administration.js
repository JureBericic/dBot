'use strict';

class RemoteAdministration {
    constructor(iocRegistry) {
        this._configurationManager = iocRegistry.getInstance('configurationManager');
        this._moduleHandler = iocRegistry.getInstance('moduleHandler');

        this._availableCommands = [
            'loadModule',
            'unloadModule',
            'reloadModule'
        ];
    }

    get availableCommands() {
        return this._availableCommands;
    }

    loadModule(msg, moduleName) {
        if (!(this.isUserAuthorized(msg))) {
            msg.reply(`Cannot load "${moduleName}": user not authorized.`);
            return;
        }

        if (!(this.isContentValid(moduleName))) {
            msg.reply(`Cannot load "${moduleName}": non-valid input for module name.`);
            return;
        }

        try {
            this._moduleHandler.loadModule(moduleName);
        } catch (error) {
            msg.reply(error.message);
            return;
        }

        msg.reply(`Module "${moduleName}" sucessfully loaded.`);
    }

    unloadModule(msg, moduleName) {
        if (!(this.isUserAuthorized(msg))) {
            msg.reply(`Cannot unload "${moduleName}": user not authorized.`);
            return;
        }

        if (!(this.isContentValid(moduleName))) {
            msg.reply(`Cannot unload "${moduleName}": non-valid input for module name.`);
            return;
        }

        try {
            this._moduleHandler.unloadModule(moduleName);
        } catch (error) {
            msg.reply(error.message);
            return;
        }

        msg.reply(`Module "${moduleName}" sucessfully unloaded.`);
    }

    reloadModule(msg, moduleName) {
        if (!(this.isUserAuthorized(msg))) {
            msg.reply(`Cannot reload "${moduleName}": user not authorized.`);
            return;
        }

        if (!(this.isContentValid(moduleName))) {
            msg.reply(`Cannot reload "${moduleName}": non-valid input for module name.`);
            return;
        }

        try {
            this._moduleHandler.unloadModule(moduleName);
            this._moduleHandler.loadModule(moduleName);
        } catch (error) {
            msg.reply(error.message);
            return;
        }

        msg.reply(`Module "${moduleName}" sucessfully reloaded.`);
    }

    isUserAuthorized(msg) {
        let messageAuthorSnowflake = msg.author.id;
    
        return this._configurationManager.admins.includes(messageAuthorSnowflake);
    }
    
    isContentValid(content) {
        if (!content) {
            return false;
        }
    
        let tokenized = content.split(' ');
        return tokenized.length === 1;
    }
}

module.exports = RemoteAdministration;
