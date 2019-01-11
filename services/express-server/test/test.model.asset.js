const assert = require('assert').assert;
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



    it('Asset should save without error', function (done) {
        const asset = new Asset({name: "test asset"});
        asset.save(done);
    });

    it('Asset should save with defaults', function (done) {

        const a = new Asset({name: "test asset"});

        const assetPromise = a.save();

        assetPromise
            .then(asset => {
                expect(asset).to.have.property('_id');
                expect(asset).to.have.property('name');
                expect(asset).to.have.property('connected_to');
                expect(asset).to.have.property('tags');
                expect(asset).to.have.property('nodeShape');
                expect(asset).to.have.property('nodeColor');
                //expect(asset).to.have.any.keys(
                //    '_id', 'name', 'connected_to',
                //    'tags', 'nodeShape', 'nodeColor'
                //);
                done()
            })
            .catch(err => done(err))
    });

    it('Asset should save with proper values', function (done) {

        const a = new Asset({
            name: "test asset",
            connected_to: ["test asset two", "test asset three"],
            tags: ["tag one", "tag two"],

        });

        const assetPromise = a.save();

        assetPromise
            .then(asset => {
                // name saves correctly
                expect(asset.name).to.equal("test asset");

                // connected_to saves correctly
                expect(asset.connected_to).to
                    .include.members(
                        ["test asset two", "test asset three"]
                    );

                // connected_to saves correctly
                expect(asset.tags).to
                    .include.members(
                        ["tag one", "tag two"]
                    );



                done()
            })
            .catch(err => done(err))
    });
});
