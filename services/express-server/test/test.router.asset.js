const chai = require('chai');
const chaiHttp = require('chai-http');
const assetRouter = require('../src/routers/asset.router');

const initDatabaseConnection = require('../src/database');
const {resetModels, loadDataToDB, clearDB} = require('../src/utils/testHandlers');
//const app = require('../src/index');


chai.use(chaiHttp);

const HOST = 'http://localhost:3000';

const expect = chai.expect;

try {
    initDatabaseConnection({database: "unit-tests", env: "tests"});
} catch (err) {
    console.log("error with db connection")
}
 

describe('Asset API endpoint ', function () {

    before(async function () {
        await loadDataToDB();
    });

    after(async function () {
        await clearDB();
    });


    beforeEach(async function () {
        //await resetModels();
    });

    afterEach(async function () {
        //await clearDB();
    });

    it('gets asset by name', function (done) {

        chai.request(HOST)
            .get('/asset')
            .end((err, res) => {

                expect(res).to.have.header(
                    'content-type',
                    'application/json; charset=utf-8'
                );

                expect(err).to.be.null;
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                done();
            });

    });


    it('post returns 200 and asset with defaults if name provided', (done) => {
        chai.request(HOST)
            .post("/asset")
            .send({name: "assetName"})
            .end((err, res) => {

                expect(res.body.name).to.equal("assetName");
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


