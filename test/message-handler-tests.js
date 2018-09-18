'use strict';

const expect = require('chai').expect;
const MessageHandler = require('../src/module-handler');

describe('Message handler tests', () => {

    describe('constructor', () => {

        it('Should construct', () => {
            // Arrange and Act
            let messageHandler = new MessageHandler();

            // Assert
            expect(messageHandler).to.exist;
        });
    });
});