'use strict';

class MessageHandler {
    constructor(iocRegistry) {
        this._configurationManager = iocRegistry.getInstance('configurationManager');
        this._moduleManager = iocRegistry.getInstance('moduleHandler');

        this._callSignal = `<@${this._configurationManager.clientId}>`;
    }

    processMessage(msg) {
        console.log('processing message');
        // Only process messages that start with bot's call signal.
        if (!msg.content.startsWith(this._callSignal)) {
            console.log('not for me')
            return;
        }

        console.log('for me');
        msg.reply('Hello :)');
    }
}

module.exports = MessageHandler;
