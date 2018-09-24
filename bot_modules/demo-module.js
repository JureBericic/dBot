'use strict';

class DemoModule {
    constructor() {
        this._availableCommands = [
            'ping',
            'hello',
            'echo'
        ];
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

    echo(msg, content) {
        msg.reply(content);
    }
}

module.exports = DemoModule;
