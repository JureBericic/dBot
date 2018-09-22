'use strict';

const expect = require('chai').expect;
const IocRegistry = require('../src/ioc-registry');

describe('IOC registry tests', () => {

    describe('constructor', () => {

        it('Should construct.', () => {
            // Act
            let iocRegistry = new IocRegistry();

            // Assert
            /* jshint -W030 */
            expect(iocRegistry).to.exist;
            /* jshint +W030 */
        });

        it('Should initialize to empty elements.', () => {
            // Act
            let iocRegistry = new IocRegistry();

            // Assert
            expect(iocRegistry._register).to.deep.equal({});
        });
    });

    describe('registerInstace', () => {
        
        it('Should register an instance.', () => {
            // Arrange
            let iocRegistry = new IocRegistry();
            let instanceKey = 'objectAB';
            let instance = {a: 'a', b: 'b'};

            // Act
            iocRegistry.registerInstance(instanceKey, instance);

            // Assert
            expect(iocRegistry._register).to.haveOwnProperty(instanceKey).that.equals(instance);
        });

        it('Should register second instance.', () => {
            // Arrange
            let iocRegistry = new IocRegistry();
            iocRegistry.registerInstance('aKey', 'anInstance');

            // Act
            iocRegistry.registerInstance('anotherKey', 'anotherInstance');

            // Assert
            expect(iocRegistry._register).to.haveOwnProperty('anotherKey').that.equals('anotherInstance');
        });

        it('Should throw when registering under same key twice.', () => {
            // Arrange
            let iocRegistry = new IocRegistry();
            let register = () => {
                iocRegistry.registerInstance('aKey', 'anInstance');
            };
            register();

            expect(register).to.throw('Cannot register "aKey": instance with same key already exists.');

        });
    });

    describe('getInstance', () => {
        
        it('Should return an instance.', () => {
            // Arrange
            let iocRegistry = new IocRegistry();
            let instanceKey = 'objectAB';
            let instance = {a: 'a', b: 'b'};
            iocRegistry.registerInstance(instanceKey, instance);

            // Act
            let returnedInstance = iocRegistry.getInstance(instanceKey);

            // Assert
            expect(returnedInstance).to.equal(instance);
        });

        it('Should throw when key not found.', () => {
            // Arrange
            let iocRegistry = new IocRegistry();
            let getByNonExistingKey = () => {
                iocRegistry.getInstance('thisKeyWasNotRegistered');
            };

            // Act and Assert
            expect(getByNonExistingKey).to.throw('Cannot get "thisKeyWasNotRegistered": no such key registered.');
        });
    });

    describe('getKeys', () => {

        it('Should return registered keys.', () => {
            // Arrange
            let iocRegistry = new IocRegistry();
            iocRegistry.registerInstance('keyA', 'instanceA');
            iocRegistry.registerInstance('keyB', 'instanceB');

            // Act
            let registeredKeys = iocRegistry.getKeys();

            // Assert
            expect(registeredKeys).to.deep.equal(['keyA', 'keyB']);
        });
    });
});
