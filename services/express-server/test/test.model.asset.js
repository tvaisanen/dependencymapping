const assert = require('assert').assert;
const expect = require('chai').expect;
const Asset = require('../src/models').Asset;
const Connection = require('../src/models').Connection;
const path = require('path');

const initDatabaseConnection = require('../src/database');
const {resetModels, loadDataToDB, clearDB } = require('../src/utils/testHandlers');


try {
    initDatabaseConnection({database: "unit-tests"});
} catch (err){
    console.log("error with db connection")
}


describe('Asset model tests', function () {

    before(async function () {
        await resetModels();
    });

    after(async function () {
        //await clearDB();
    });

    beforeEach(async function () {
        await resetModels();
        console.log('before each load data to db')
    });

    afterEach(async function () {
        //await clearDB();
        console.log('after each clear data from db')
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
        const expectedValues = {
            name: "test asset",
            connected_to: ["test asset two", "test asset three"],
            tags: ["tag one", "tag two"],
            description: "describing test asset",
            nodeShape: "triangle",
            nodeColor: "blue"

        };

        const a = new Asset(expectedValues);

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

                // description saves correctly
                expect(asset.description).to
                    .equal(expectedValues.description);


                // description saves correctly
                expect(asset.nodeShape).to
                    .equal(expectedValues.nodeShape);


                // description saves correctly
                expect(asset.nodeColor).to
                    .equal(expectedValues.nodeColor);

                done()
            })
            .catch(err => done(err))
    });

    it('On asset save the connections should be created', function (done) {

        const expectedValues = {
            name: "test asset",
            connected_to: ["foo", "bar"]
        };

        const a = new Asset(expectedValues);

        const assetPromise = a.save();

        assetPromise
            .then(asset => {
               Connection.find({source: expectedValues.name})
                   .then(connections => {
                       connections.forEach(c => {
                           console.log(c)
                       })
                       /*expect(connections).to
                           .include.members(
                           [{source: "test asset"}]
                       );*/
                       expect(connections.length).to.equal(2);
                       done();
                   })
                   .catch(err => done(err))
            })
            .catch(err => done(err))
    });
});
