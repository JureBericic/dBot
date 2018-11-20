'use strict';

class MessageHandler {
    constructor(iocRegistry) {
        this._configurationManager = iocRegistry.getInstance('configurationManager');
        this._moduleHandler = iocRegistry.getInstance('moduleHandler');
    }

    processMessage(msg) {
        // Only process messages that start with bot's call signal.
        if (!msg.content.startsWith(this._configurationManager.callSign)) {
            return;
        }

        let remainingContent = msg.content.replace(this._configurationManager.callSign, '').trimStart();
        if (!remainingContent) {
            return;
        }

        // Parse command and load corresponding function.
        let command = remainingContent.split(/\s+/)[0];
        let functionForCommand;
        try {
            functionForCommand = this._moduleHandler.getFunctionForCommand(command);
        } catch (error) {
            msg.reply(`Command "${command}" is not registered.`);
            return;
        }

        // Call function.
        remainingContent = remainingContent.replace(command, '').trimStart();
        try {
            functionForCommand(msg, remainingContent);
        } catch (error) {
            msg.reply('Command failed.')
        }
        
    }

    // Splits message content into next token and remainder
    getNextToken(content) {
        const token = content.split(' ')[0];
        const remainingContent = content.replace(token, '').trimStart();

        return {
            token,
            remainingContent
        };
    }
}

module.exports = MessageHandler;
