const expect = require('chai').expect;
const Asset = require('../src/models').Asset;
const path = require('path');

const initDatabaseConnection = require('../src/database');
const resetModels = require('../src/utils/testHandlers').resetModels;


try {
    initDatabaseConnection({database: "unit-tests"});
} catch (err){
    console.log("error with db connection")
}


describe('Asset model tests', function () {

    before(async function () {
        await resetModels();
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



    it('Asset should store in database', async function (done) {
        const a = new Asset({name: "test asset"});
        const promise = a.save();
        promise.then(a => {

                expect(a.name).to.equal("test asset")
                done();
            }
        ).catch(e => assert(false))


    });
});
