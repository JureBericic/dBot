'use strict';

class DemoModule {
    constructor() {
        this._availableCommands = [
            'ping',
            'hello'
        ]
    }

    get availableCommands() {
        return this._availableCommands;
    }

    ping(message) {
        message.reply('pong');
    }

    hello(message) {
        message.reply('hi');
    }
}

module.exports = DemoModule;
