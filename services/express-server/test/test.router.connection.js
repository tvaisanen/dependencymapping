const chai = require('chai');
const chaiHttp = require('chai-http');
const initDatabaseConnection = require('../src/database');
const {loadDataToDB, clearDB} = require('../src/utils/testHandlers');


chai.use(chaiHttp);

const HOST = 'http://localhost:3000';
const RESOURCE = '/connection';

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
                console.debug(res.body)
                expect(res).to.have.status(409);
                done();
            });
    });

    it('Connection delete by id should delete and return', (done) => {
        chai.request(HOST)
            .get('/connection/?source=TestPageOne&target=TestPageFour')
            .end((err, res) => {
                console.log(res.body)
                chai.request(HOST)
                    .delete(`${RESOURCE}/${res.body._id}`)
                    .end((err, res) => {
                        expect(res).to.have.status(204);
                        done();
                    });
            })

    });

});

