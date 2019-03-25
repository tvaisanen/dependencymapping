const assert = require('assert').assert;
const expect = require('chai').expect;
const Tag = require('../src/models').Tag;
const path = require('path');

const initDatabaseConnection = require('../src/database');
const { resetModels } = require('../src/utils/testHandlers');


try {
    initDatabaseConnection({database: "unit-tests", env: "tests"});
} catch (err) {
    console.log("error with db connection")
}


describe('Tag model tests', function () {


    before(async function () {
        try {
            await resetModels();
            console.log(`\n"Database has been reset for tests reset!\n`)
        } catch (err) {
            console.error(err);
        }
    });

    it('should be invalid if name is empty', function (done) {
        const tag = new Tag();
        tag.validate(function (err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });

    it('Tag should save without errors when name is provided', done => {
        const tag = new Tag({name: "newtag"});

        tag.save()
            .then(savedTag => {
                expect(savedTag.name).to.be.equal(tag.name);
                done()
            })
            .catch(err => done(err))

    })
});