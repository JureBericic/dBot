'use strict';

const path = require('path');

class ModuleHandler {
    constructor() {
        // Register of loaded modules.
        this._loadedModules = {};
        // Register of available commands.
        this._availableCommands = {};
    }

    get loadedModules() {
        return this._loadedModules;
    }

    get availableCommands() {
        return this._availableCommands;
    }
    
    loadModule(moduleName) {
        if (moduleName in this._loadedModules) {
            throw new Error(`Cannot load "${moduleName}": module with same name already loaded.`);
        }

        let loadedModuleInstance;
        try {
            let loadedModule = require(path.join('..', 'bot_modules', moduleName));
            loadedModuleInstance = new loadedModule();
        } catch (error) {
            throw new Error(`Cannot load "${moduleName}": module does not exist.`);
        }

        // Add loaded module to module register.
        this._loadedModules[moduleName] = loadedModuleInstance;
        // Add module commands to command register.
        for (let command of loadedModuleInstance.availableCommands) {
            // TODO: check for shadowing
            this._availableCommands[command] = loadedModuleInstance;
        }
    }

    unloadModule(moduleName) {
        if (!(moduleName in this._loadedModules)) {
            throw new Error(`Cannot unload "${moduleName}": no loaded module with such name.`);
        }

        let loadedModuleInstance = this._loadedModules[moduleName];
        let moduleCommands = loadedModuleInstance.availableCommands;

        // Remove all module commands from command register.
        for (let command of moduleCommands) {
            if (
                command in this._availableCommands &&
                this._availableCommands[command] === loadedModuleInstance
            ) {
                delete this._availableCommands[command];
            }
        }
        // Remove module from module register.
        delete this._loadedModules[moduleName];
    }
}

module.exports = ModuleHandler;
