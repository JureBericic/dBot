'use strict';

const expect = require('chai').expect;
const ConfigurationManager = require('../src/configuration-manager');

describe('Configuration manager tests', () => {

    describe('constructor', () => {

        it('Should construct and initialize with minimal configuration.', () => {
            // Arrange
            let configurationPath = './test/test-data/bot-configuration-minimal.json';

            // Act
            let configurationManager = new ConfigurationManager(configurationPath);

            // Assert
            expect(configurationManager.botToken).to.equal('testToken');
            expect(configurationManager.clientId).to.equal('testClientId');
            expect(configurationManager.callSign).to.equal(`<@testClientId>`);
            expect(configurationManager.loadOnStart).to.deep.equal([]);
        });

        it('Should construct and initialize with full configuration.', () => {
            // Arrange
            let configurationPath = './test/test-data/bot-configuration-full.json';

            // Act
            let configurationManager = new ConfigurationManager(configurationPath);

            // Assert
            expect(configurationManager.botToken).to.equal('testToken');
            expect(configurationManager.clientId).to.equal('testClientId');
            expect(configurationManager.callSign).to.equal(`testCallSign`);
            expect(configurationManager.loadOnStart).to.deep.equal(['test-module']);
        });

        it('Should correctly handle "@mention" as call sign.', () => {
            // Arrange
            let configurationPath = './test/test-data/bot-configuration-call-sign-mention.json';

            // Act
            let configurationManager = new ConfigurationManager(configurationPath);

            // Assert
            expect(configurationManager.callSign).to.equal(`<@testClientId>`);
        });

        it('Should throw when configuration file not found.', () => {
            // Arrange
            let configurationPath = './test/test-data/this-configuration-does-not-exists.json';
            let loadNonExistingConfiguration = () => {
                new ConfigurationManager(configurationPath)
            };

            // Act and Assert
            expect(loadNonExistingConfiguration).to.throw();
        });

        it('Should throw for invalid configuration.', () => {
            // Arrange
            let configurationPath = './test/test-data/bot-configuration-invalid.json';
            let loadInvalidConfiguration = () => {
                new ConfigurationManager(configurationPath)
            };

            // Act and Assert
            expect(loadInvalidConfiguration).to.throw();
        });
    });
});
