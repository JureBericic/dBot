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

    ping(msg) {
        msg.reply('pong');
    }

    hello(msg) {
        msg.reply('hi');
    }
}

module.exports = DemoModule;
