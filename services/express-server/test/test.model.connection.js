const assert = require('assert').assert;
const expect = require('chai').expect;
const Asset = require('../src/models').Asset;
const Connection = require('../src/models').Connection;
const path = require('path');

const initDatabaseConnection = require('../src/database');
const {resetModels, loadDataToDB, clearDB} = require('../src/utils/testHandlers');


try {
    initDatabaseConnection({database: "unit-tests", env: "tests"});
} catch (err) {
    console.log("error with db connection")
}


describe('Connection model tests', function () {

    before(async function () {
        try {
            await resetModels();
            console.log(`\n"Database has been reset for tests reset!\n`)
        } catch (err) {
            console.error(err);
        }
    });

    it('should be invalid if source and target are empty', function (done) {

        const a = new Connection();

        a.validate(function (err) {
            expect(err.errors.source).to.exist;
            expect(err.errors.target).to.exist;
            done();
        });
    });

    it('should be invalid if source is empty', function (done) {

        const a = new Connection({target: "name"});

        a.validate(function (err) {
            expect(err.errors.source).to.exist;
            done();
        });
    });

    it('should be invalid if target is empty', function (done) {

        const a = new Connection({source: "name"});

        a.validate(function (err) {
            expect(err.errors.target).to.exist;
            done();
        });
    });

});