const assert = require('assert').assert;
const expect = require('chai').expect;
const {Asset, Connection} = require('../src/models');
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
        await loadDataToDB();
    });

    after(async function () {
        await clearDB();
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

    it('Reference to connection should be eliminated from assets "connected_to" list when connection is deleted', done => {
        // give the backend a moment to create the connections after database reset

        const targetAsset = new Asset({name: 'targetAsset'})
        const sourceAsset = new Asset({name: 'sourceAsset', connected_to: ['targetAsset']})

        targetAsset.save()
            .then(() => sourceAsset.save())
            .then(sourceAsset => Connection.findOne({source: sourceAsset.name}))
            .then(connection =>  {
            // let's confirm that the connection is set up correctly
                expect(connection.source).to.equal(sourceAsset.name);
                expect(connection.target).to.equal(targetAsset.name);
                return Connection.findOneAndDelete({_id: connection._id});})
            // now it we need to check that targetAsset name is removed from the sourceAssets
            // connected_to list
            .then(deletedConnection => Asset.findOne({name: deletedConnection.source}))
            .then(updatedSourceAsset => {
                expect(updatedSourceAsset.connected_to.length).to.equal(0);
                done()
            })
            .catch(err => done(err));


    });


});