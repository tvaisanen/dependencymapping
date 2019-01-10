const expect = require('chai').expect;
const Asset = require('../src/models').Asset;
const path = require('path');

const initDatabaseConnection = require('../src/database');
const resetModels = require('../src/utils/testHandlers').resetModels;


try {
    initDatabaseConnection();
} catch (err){
    console.log("error with db connection")
}


describe('Asset model tests', function () {

    before(function () {
        resetModels();
    });

    after(function () {
        console.log('after')
    });

    beforeEach(function () {
        console.log('before each')
        // runs before each test in this block
    });

    afterEach(function () {
        console.log("after each")
        // runs after each test in this block
    });

    it('should be invalid if name is empty', function (done) {
        const a = new Asset();

        a.validate(function (err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });
});
