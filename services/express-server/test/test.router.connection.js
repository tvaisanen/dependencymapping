const chai = require('chai');
const chaiHttp = require('chai-http');
const assetRouter = require('../src/routers/asset.router');

const initDatabaseConnection = require('../src/database');
const {resetModels, loadDataToDB, clearDB} = require('../src/utils/testHandlers');
//const app = require('../src/index');

const assetEndpoint = require('../src/controllers/asset.controller');

chai.use(chaiHttp);

const HOST = 'http://localhost:3000';

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
            .get('/connection')
            .end((err, res) => {

                expect(err).to.be.null;
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                done();
            });

    });


    it('post returns 200 and connectio with defaults if source and target provided', (done) => {
        chai.request(HOST)
            .post("/connection")
            .send({
                source: "sourceName",
                target: "targetName"
            })
            .end((err, res) => {
                expect(res.body.source).to.equal("sourceName");
                expect(res.body.target).to.equal("targetName");
                expect(res).to.have.status(201);
                done();
            });
    });

    it('post returns 400 if asset already exists ', (done) => {
        chai.request(HOST)
            .post('/asset')
            .send({name: "TestPageFour"})
            .end((err, res) => {
                expect(res).to.have.status(409);
                done();
            });
    });

    it('delete returns success', (done) => {
        chai.request(HOST)
            .get('/asset/?name=TestPageFour')
            .end((err, res) => {
                console.log(res)
                chai.request(HOST)
                    .delete(`/asset/${res.body._id}`)
                    .send({name: "TestPageFour"})
                    .end((err, res) => {
                        expect(res).to.have.status(204);
                        done();
                    });
            })

    });

});

