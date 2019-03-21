const chai = require('chai');
const chaiHttp = require('chai-http');
const initDatabaseConnection = require('../src/database');
const {loadDataToDB, clearDB} = require('../src/utils/testHandlers');


chai.use(chaiHttp);

const HOST = 'http://localhost:3000';
const RESOURCE = '/connection';
const CONNECTION = '/connection';
const ASSET = '/asset';

const expect = chai.expect;

try {
    initDatabaseConnection({database: "unit-tests", env: "tests"});
} catch (err) {
    console.log("error with db connection")
}


describe('Connection API endpoint ', function () {

    before(async function () {
        await loadDataToDB();
    });

    after(async function () {
        await clearDB();
    });


    beforeEach(async function () {
        console.log("reset?")
        //await resetModels();
    });

    afterEach(async function () {
        //await clearDB();
    });

    it('Returns 200', function (done) {

        chai.request(HOST)
            .get(RESOURCE)
            .end((err, res) => {

                expect(err).to.be.null;
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                done();
            });

    });


    it('post returns 200 and connection with defaults if source and target provided', (done) => {
        chai.request(HOST)
            .post(RESOURCE)
            .send({
                source: "sourceName",
                target: "targetName"
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.source).to.equal("sourceName");
                expect(res.body.target).to.equal("targetName");
                done();
            });
    });

    it('post returns 400 if connection already exists ', (done) => {
        chai.request(HOST)
            .post(RESOURCE)
            .send({
                source: "TestPageOne",
                target: "TestPageFour"
            })
            .end((err, res) => {
                expect(res).to.have.status(409);
                done();
            });
    });

    it('Connection delete by id should delete and return', (done) => {
        chai.request(HOST)
            .get('/connection/?source=TestPageOne&target=TestPageFour')
            .end((err, res) => {
                chai.request(HOST)
                    .delete(`${RESOURCE}/${res.body._id}`)
                    .end((err, res) => {
                        expect(res).to.have.status(204);
                        done();
                    });
            })
    });

    it('On connection delete the connection target should be removed from the source assets connected_to list', done => {

        const asset = {
            name: "testAssetForConnectionTest",
            connected_to: ['other', 'delete this']
        };

        const expected = {
            name: "testAssetForConnectionTest",
            connected_to: ['other']
        };

        const startTheTestChain = () => {
            chai.request(HOST)
                .post(ASSET)
                .send(asset)
                .end((err, res) => {
                    makeSureThatConnectionIsCreated();
                });
        };

        const makeSureThatConnectionIsCreated = () => {
            chai.request(HOST)
                .get(`${CONNECTION}/?source=${asset.name}&target=${asset.connected_to[1]}`)
                .end((err, res) => {
                    deleteTheFetchedConnection(res.body._id);
                })
        };

        const deleteTheFetchedConnection = (id) => {
            console.log(`connection with this id should be deleted: ${id}`);
            chai.request(HOST)
                .delete(`${CONNECTION}/${id}`)
                .end((err, res) => {
                    fetchTheAssetAfterDeletingTheConnectionToSeeIfItsUpdatedCorrectly();
                })
        };

        const fetchTheAssetAfterDeletingTheConnectionToSeeIfItsUpdatedCorrectly = () => {
            chai.request(HOST)
                .get(`${ASSET}/byName/${asset.name}`)
                .end((err,res) => {
                    expect(res.body._embedded.connected_to.length)
                        .to.equal(expected.connected_to.length);
                    done();
                })
        };

        startTheTestChain();

    })

});

































