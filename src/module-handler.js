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
            throw new Error(`Module ${moduleName} already loaded.`);
        }

        // TODO: try-catch if not exists
        let loadedModule = require(path.join('..', 'bot_modules', moduleName));
        let loadedModuleInstance = new loadedModule();

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
            throw new Error(`Module ${moduleName} is not loaded.`);
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

        let a = 1;
    }
}

module.exports = ModuleHandler;
