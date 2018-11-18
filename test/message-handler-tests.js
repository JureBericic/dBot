'use strict';

const expect = require('chai').expect;
const MessageHandler = require('../src/message-handler');
const sinon = require('sinon');

let mockIocRegistry = {
    getInstance: sinon.stub()
};

let mockConfigurationManager = {
    callSign: 'testCallSign'
};

let mockModuleHandler = {
};

mockIocRegistry.getInstance.withArgs(sinon.match('configurationManager')).returns(mockConfigurationManager);
mockIocRegistry.getInstance.withArgs(sinon.match('moduleHandler')).returns(mockModuleHandler);

describe('Message handler tests', () => {

    describe('constructor', () => {

        it('Should construct and initialize.', () => {
            // Act
            let messageHandler = new MessageHandler(mockIocRegistry);            

            // Assert
            /* jshint -W030 */
            expect(messageHandler).to.exist;
            /* jshint +W030 */
            expect(messageHandler._configurationManager).to.equal(mockConfigurationManager);
            expect(messageHandler._moduleHandler).to.equal(mockModuleHandler);
        });
    });

    describe('processMessage', () => {

        let message;

        beforeEach(() => {
            message = {
                content: 'testCallSign testCommand test input'
            };
        });

        xit('tmp', () => {
            // Arrange
            let messageHandler = new MessageHandler(mockIocRegistry);

            // Act
            messageHandler.processMessage(message);

            // Assert

        });

        it('Should not throw on a message with only call sign.', () => {
            // Arrange
            let messageHandler = new MessageHandler(mockIocRegistry);
            message.content = 'testCallSign';
            let callProcessMessage = () => {
                messageHandler.processMessage(message);
            };

            // Act and Assert
            expect(callProcessMessage).to.not.throw();
        });

        it('Should not throw on a message with only call sign and whitespace.', () => {
            // Arrange
            let messageHandler = new MessageHandler(mockIocRegistry);
            message.content = 'testCallSign';
            let callProcessMessage = () => {
                messageHandler.processMessage(message);
            };

            // Act and Assert
            expect(callProcessMessage).to.not.throw();
        });

        it('Should not throw on a message that does not start with the call sign.', () => {
            // Arrange
            let messageHandler = new MessageHandler(mockIocRegistry);
            message.content = 'notTheCallSign sample text';
            let callProcessMessage = () => {
                messageHandler.processMessage(message);
            };

            // Act and Assert
            expect(callProcessMessage).to.not.throw();
        });
    });
});