'use strict';

const expect = require('chai').expect;
const ConfigurationManager = require('../src/configuration-manager');

describe('Configuration manager tests', () => {

    describe('constructor', () => {

        it('Should read file and correctly initialize.', () => {
            // Arrange
            let configurationPath = './test/test-data/test-bot-configuration.json';

            // Act
            let configurationManager = new ConfigurationManager(configurationPath);

            // Assert
            expect(configurationManager.botToken).to.equal('testToken');
            expect(configurationManager.clientId).to.equal('testClientId');
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
    });
});
