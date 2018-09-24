'use strict';

const path = require('path');

class ModuleHandler {
    constructor(iocRegistry) {
        // IOC registry.
        this._iocRegistry = iocRegistry;

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

        let loadedModule;
        let loadedModuleInstance;
        try {
            loadedModule = require(path.join('..', 'bot_modules', moduleName));
            
        } catch (error) {
            throw new Error(`Cannot load "${moduleName}": module does not exist.`);
        }
        try {
            loadedModuleInstance = new loadedModule(this._iocRegistry);
        } catch (error) {
            throw new Error(`Cannot load "${moduleName}": error while constructiong an instance.`);
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

    getModuleForCommand(command) {
        if (!(command in this._availableCommands)) {
            throw new Error(`Cannot get module for "${command}": no such command registered.`);
        }

        return this._availableCommands[command];
    }

    getFunctionForCommand(command) {
        if (!(command in this._availableCommands)) {
            throw new Error(`Cannot get function for "${command}": no such command registered.`);
        }

        return this._availableCommands[command][command].bind(this._availableCommands[command]);
    }
}

module.exports = ModuleHandler;
