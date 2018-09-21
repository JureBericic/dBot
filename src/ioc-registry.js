'use strict';

class IocRegistry {
    constructor() {
        // Register of class instances.
        this._register = {};
    }

    registerInstance(instanceKey, instance) {
        if (this._register.hasOwnProperty(instanceKey)) {
            throw new Error(`Cannot register "${instanceKey}": instance with same key already exists.`);
        }

        this._register[instanceKey] = instance;
    }

    getInstance(instanceKey) {
        if (!this._register.hasOwnProperty(instanceKey)) {
            throw new Error(`Cannot get "${instanceKey}": no such key registered.`);
        }
        
        return this._register[instanceKey];
    }

    getKeys() {
        return Object.keys(this._register);
    }
}

module.exports = IocRegistry;
