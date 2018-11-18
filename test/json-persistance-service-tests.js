'use strict';

const expect = require('chai').expect;
const rewire = require('rewire');
const sinon = require('sinon');

const JsonPersistanceService = rewire('../src/json-persistance-service');

describe('JSON persistance service tests', () => {

    describe('constructor', () => {

        it('Should construct.', () => {
            // Act
            let jsonPersistanceService = new JsonPersistanceService();

            // Assert
            /* jshint -W030 */
            expect(jsonPersistanceService).to.exist;
            /* jshint +W030 */
        });
    });

    describe('persist', () => {

        it('Should persist item.', () => {
            // Arrange
            let key = 'testKey';
            let item = {a: 1};

            let fakeWriteFileSync = sinon.fake();
            const mockFs = {
                writeFileSync: fakeWriteFileSync
            }
            JsonPersistanceService.__with__({
                fs: mockFs
            })(function() {
                let jsonPersistanceService = new JsonPersistanceService();

                // Act
                jsonPersistanceService.persist(key, item);
            });

            // Assert
            expect(fakeWriteFileSync.callCount).to.equal(1);
            expect(fakeWriteFileSync.lastCall.args).to.have.length(2);
            expect(fakeWriteFileSync.lastCall.args[0]).to.equal(`./data/${key}.json`);
            expect(fakeWriteFileSync.lastCall.args[1]).to.equal(JSON.stringify(item));
        });

        it('Should throw when no key.', () => {
            // Arrange
            let call;

            let fakeWriteFileSync = sinon.fake();
            const mockFs = {
                writeFileSync: fakeWriteFileSync
            }
            JsonPersistanceService.__with__({
                fs: mockFs
            })(function() {
                let jsonPersistanceService = new JsonPersistanceService();

                call = () => jsonPersistanceService.persist();
                // Assert
                expect(call).to.throw(`Cannot persist: no or empty key provided.`);
            });

            expect(fakeWriteFileSync.callCount).to.equal(0);
        });

        it('Should throw when empty key.', () => {
            // Arrange
            let key = '';
            let call;

            let fakeWriteFileSync = sinon.fake();
            const mockFs = {
                writeFileSync: fakeWriteFileSync
            }
            JsonPersistanceService.__with__({
                fs: mockFs
            })(function() {
                let jsonPersistanceService = new JsonPersistanceService();

                call = () => jsonPersistanceService.persist(key);
                // Assert
                expect(call).to.throw(`Cannot persist: no or empty key provided.`);
            });

            expect(fakeWriteFileSync.callCount).to.equal(0);
        });

        it('Should throw when no item.', () => {
            // Arrange
            let key = 'testKey';
            let call;

            let fakeWriteFileSync = sinon.fake();
            const mockFs = {
                writeFileSync: fakeWriteFileSync
            }
            JsonPersistanceService.__with__({
                fs: mockFs
            })(function() {
                let jsonPersistanceService = new JsonPersistanceService();

                call = () => jsonPersistanceService.persist(key);
                // Assert
                expect(call).to.throw(`Cannot persist "${key}": no item provided.`);
            });

            expect(fakeWriteFileSync.callCount).to.equal(0);
        });
    });

    describe('retrive', () => {

        it('Should retrieve item.', () => {
            // Arrange
            let key = 'testKey';
            let item;

            let fakeExistsSync = sinon.fake.returns(true);
            let fakeReadFileSync = sinon.fake.returns('{"a": 1}');
            const mockFs = {
                existsSync: fakeExistsSync,
                readFileSync: fakeReadFileSync
            }
            JsonPersistanceService.__with__({
                fs: mockFs
            })(function() {
                let jsonPersistanceService = new JsonPersistanceService();

                // Act
                item = jsonPersistanceService.retrieve(key);
            });

            // Assert
            expect(fakeExistsSync.callCount).to.equal(1);
            expect(fakeReadFileSync.callCount).to.equal(1);
            expect(item).to.deep.equal({a: 1});
        });

        it('Should throw when no key.', () => {
            // Arrange
            let call;

            let fakeExistsSync = sinon.fake.returns(true);
            let fakeReadFileSync = sinon.fake.returns('{"a": 1}');
            const mockFs = {
                existsSync: fakeExistsSync,
                readFileSync: fakeReadFileSync
            }
            JsonPersistanceService.__with__({
                fs: mockFs
            })(function() {
                let jsonPersistanceService = new JsonPersistanceService();

                call = () => jsonPersistanceService.retrieve();
                // Assert
                expect(call).to.throw(`Cannot retrieve: no or empty key provided.`);
            });

            expect(fakeExistsSync.callCount).to.equal(0);
            expect(fakeReadFileSync.callCount).to.equal(0);
        });

        it('Should throw when empty key.', () => {
            // Arrange
            let key = '';
            let call;

            let fakeExistsSync = sinon.fake.returns(true);
            let fakeReadFileSync = sinon.fake.returns('{"a": 1}');
            const mockFs = {
                existsSync: fakeExistsSync,
                readFileSync: fakeReadFileSync
            }
            JsonPersistanceService.__with__({
                fs: mockFs
            })(function() {
                let jsonPersistanceService = new JsonPersistanceService();

                call = () => jsonPersistanceService.retrieve(key);
                // Assert
                expect(call).to.throw(`Cannot retrieve: no or empty key provided.`);
            });

            expect(fakeExistsSync.callCount).to.equal(0);
            expect(fakeReadFileSync.callCount).to.equal(0);
        });

        it('Should throw when wrong key.', () => {
            // Arrange
            let key = 'wrongKey';
            let call;

            let fakeExistsSync = sinon.fake.returns(false);
            let fakeReadFileSync = sinon.fake.returns('{"a": 1}');
            const mockFs = {
                existsSync: fakeExistsSync,
                readFileSync: fakeReadFileSync
            }
            JsonPersistanceService.__with__({
                fs: mockFs
            })(function() {
                let jsonPersistanceService = new JsonPersistanceService();

                call = () => jsonPersistanceService.retrieve(key);
                // Assert
                expect(call).to.throw(`Cannot retrieve "${key}": no such entry exists.`);
            });

            expect(fakeExistsSync.callCount).to.equal(1);
            expect(fakeReadFileSync.callCount).to.equal(0);
        });
    });

    describe('delete', () => {

        it('Should delete item.', () => {
            // Arrange
            let key = 'testKey';

            let fakeExistsSync = sinon.fake.returns(true);
            let fakeUnlinkSync = sinon.fake();
            const mockFs = {
                existsSync: fakeExistsSync,
                unlinkSync: fakeUnlinkSync
            }
            JsonPersistanceService.__with__({
                fs: mockFs
            })(function() {
                let jsonPersistanceService = new JsonPersistanceService();

                // Act
                jsonPersistanceService.delete(key);
            });

            // Assert
            expect(fakeExistsSync.callCount).to.equal(1);
            expect(fakeUnlinkSync.callCount).to.equal(1);
        });

        it('Should throw when no key.', () => {
            // Arrange
            let call;

            let fakeExistsSync = sinon.fake.returns(true);
            let fakeUnlinkSync = sinon.fake();
            const mockFs = {
                existsSync: fakeExistsSync,
                unlinkSync: fakeUnlinkSync
            }
            JsonPersistanceService.__with__({
                fs: mockFs
            })(function() {
                let jsonPersistanceService = new JsonPersistanceService();

                call = () => jsonPersistanceService.delete();
                // Assert
                expect(call).to.throw(`Cannot delete: no or empty key provided.`);
            });

            expect(fakeExistsSync.callCount).to.equal(0);
            expect(fakeUnlinkSync.callCount).to.equal(0);
        });

        it('Should throw when empty key.', () => {
            // Arrange
            let key = '';
            let call;

            let fakeExistsSync = sinon.fake.returns(true);
            let fakeUnlinkSync = sinon.fake();
            const mockFs = {
                existsSync: fakeExistsSync,
                unlinkSync: fakeUnlinkSync
            }
            JsonPersistanceService.__with__({
                fs: mockFs
            })(function() {
                let jsonPersistanceService = new JsonPersistanceService();

                call = () => jsonPersistanceService.delete(key);
                // Assert
                expect(call).to.throw(`Cannot delete: no or empty key provided.`);
            });

            expect(fakeExistsSync.callCount).to.equal(0);
            expect(fakeUnlinkSync.callCount).to.equal(0);
        });

        it('Should throw when wrong key.', () => {
            // Arrange
            let key = 'wrongKey';
            let call;

            let fakeExistsSync = sinon.fake.returns(false);
            let fakeUnlinkSync = sinon.fake();
            const mockFs = {
                existsSync: fakeExistsSync,
                unlinkSync: fakeUnlinkSync
            }
            JsonPersistanceService.__with__({
                fs: mockFs
            })(function() {
                let jsonPersistanceService = new JsonPersistanceService();

                call = () => jsonPersistanceService.delete(key);
                // Assert
                expect(call).to.throw(`Cannot delete "${key}": no such entry exists.`);
            });

            expect(fakeExistsSync.callCount).to.equal(1);
            expect(fakeUnlinkSync.callCount).to.equal(0);
        });
    });
});