const expect = require('chai').expect;
const ModuleHandler = require('../src/module-handler');

describe('Module handler tests', () => {
    it('Should counstruct', () => {
        // Act
        let moduleHandler = new ModuleHandler();

        // Assert
        expect(moduleHandler).to.exist;
    });

    it('Should initialize to empty elements', () => {
        // Act
        let moduleHandler = new ModuleHandler();

        // Assert
        expect(moduleHandler.loadedModules).to.deep.equal({});
        expect(moduleHandler.availableCommands).to.deep.equal({});
    });

    it('Should load module.', () => {
        // Arrange
        let moduleHandler = new ModuleHandler();

        // Act
        moduleHandler.loadModule('demo-module');

        // Assert
        expect(moduleHandler.loadedModules).to.haveOwnProperty('demo-module');
        expect(moduleHandler.availableCommands).to.haveOwnProperty('ping');
        expect(moduleHandler.availableCommands).to.haveOwnProperty('hello');
    });

    it('Should unload module.', () => {
        // Arrange
        let moduleHandler = new ModuleHandler();
        moduleHandler.loadModule('demo-module');

        // Act
        moduleHandler.unloadModule('demo-module');

        // Assert
        expect(moduleHandler.loadedModules).to.not.haveOwnProperty('demo-module');
        expect(moduleHandler.availableCommands).to.not.haveOwnProperty('ping');
        expect(moduleHandler.availableCommands).to.not.haveOwnProperty('hello');
    });
});
