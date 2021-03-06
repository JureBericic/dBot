'use strict';

const expect = require('chai').expect;
const ModuleHandler = require('../src/module-handler');

describe('Module handler tests', () => {

    describe('constructor', () => {

        it('Should construct.', () => {
            // Act
            let moduleHandler = new ModuleHandler();
    
            // Assert
            /* jshint -W030 */
            expect(moduleHandler).to.exist;
            /* jshint +W030 */
        });
    
        it('Should initialize to empty elements.', () => {
            // Act
            let moduleHandler = new ModuleHandler();
    
            // Assert
            expect(moduleHandler.loadedModules).to.deep.equal({});
            expect(moduleHandler.availableCommands).to.deep.equal({});
        });
    });
    
    describe('loadModule', () => {

        it('Should load demo module.', () => {
            // Arrange
            let moduleHandler = new ModuleHandler();
    
            // Act
            moduleHandler.loadModule('demo-module');
    
            // Assert
            expect(moduleHandler.loadedModules).to.haveOwnProperty('demo-module');
            expect(moduleHandler.availableCommands).to.haveOwnProperty('ping');
            expect(moduleHandler.availableCommands).to.haveOwnProperty('hello');
        });
    
        it('Should throw when loading same module twice.', () => {
            // Arrange
            let moduleHandler = new ModuleHandler();
            let loadDemoModule = () => {
                moduleHandler.loadModule('demo-module');
            };
            loadDemoModule();
    
            // Act and Assert
            expect(loadDemoModule).to.throw(
                'Cannot load "demo-module": module with same name already loaded.'
            );
        });
    
        it('Should throw when loading non-existing module.', () => {
            // Arrange
            let moduleHandler = new ModuleHandler();
            let loadNonExistingModule = () => {
                moduleHandler.loadModule('this-module-does-not-exist');
            };
    
            // Act and Assert
            expect(loadNonExistingModule).to.throw(
                'Cannot load "this-module-does-not-exist": module does not exist.'
            );
        });
    });

    describe('unloadModule', () => {

        it('Should unload demo module.', () => {
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

        it('Should throw when unloading non-loaded module.', () => {
            // Arrange
            let moduleHandler = new ModuleHandler();
            let unloadNonLoadedModule = () => {
                moduleHandler.unloadModule('this-module-was-not-loaded');
            };

            // Act and Assert
            expect(unloadNonLoadedModule).to.throw(
                'Cannot unload "this-module-was-not-loaded": no loaded module with such name.'
            );
        });
    });

    describe('getModuleForCommand', () => {

        it('Should return correct module.', () => {
            // Arrange
            let moduleHandler = new ModuleHandler();
            moduleHandler.loadModule('demo-module');

            // Act
            let returnedModule = moduleHandler.getModuleForCommand('ping');

            // Assert
            expect(returnedModule).to.equal(moduleHandler._loadedModules['demo-module']);
        });

        it('Should throw when no such command was registered.', () => {
            // Arrange
            let moduleHandler = new ModuleHandler();
            moduleHandler.loadModule('demo-module');
            let loadModuleForNonRegisteredCommand = () => {
                moduleHandler.getModuleForCommand('nonRegisteredCommand');
            };

            // Act and Assert
            expect(loadModuleForNonRegisteredCommand).to.throw(
                'Cannot get module for "nonRegisteredCommand": no such command registered.'
            );
        });
    });

    describe('getFunctionForCommand', () => {

        it('Should return correct function.', () => {
            // Arrange
            let moduleHandler = new ModuleHandler();
            moduleHandler.loadModule('demo-module');

            // Act
            let returnedFunction = moduleHandler.getFunctionForCommand('ping');

            // Assert
            expect(returnedFunction.name).to.equal('bound ping');
        });

        it('Should throw when no such command was registered.', () => {
            // Arrange
            let moduleHandler = new ModuleHandler();
            moduleHandler.loadModule('demo-module');
            let loadFunctionForNonRegisteredCommand = () => {
                moduleHandler.getFunctionForCommand('nonRegisteredCommand');
            };

            // Act and Assert
            expect(loadFunctionForNonRegisteredCommand).to.throw(
                'Cannot get function for "nonRegisteredCommand": no such command registered.'
            );
        });
    });
});
