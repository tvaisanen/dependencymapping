const chai = require('chai');
const chaiHttp = require('chai-http');

const initDatabaseConnection = require('../src/database');
const {loadDataToDB, clearDB} = require('../src/utils/testHandlers');

chai.use(chaiHttp);

const HOST = 'http://localhost:3000';
const RESOURCE = '/mapping';

const expect = chai.expect;

try {
    initDatabaseConnection({database: "unit-tests", env: "tests"});
} catch (err) {
    console.log("error with db connection")
}


describe('Mapping API endpoint ', function () {

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


    it('Post should return 200 and the created Mapping with defaults if namet provided', (done) => {
        chai.request(HOST)
            .post(RESOURCE)
            .send({
                name: "name",
            })
            .end((err, res) => {
                expect(res.body.name).to.equal("name");
                expect(res).to.have.status(201);
                done();
            });
    });

    it('Post should return 400 if mapping by given name already exists ', (done) => {
        chai.request(HOST)
            .post(RESOURCE)
            .send({
                name: "TestMappingOne",
            })
            .end((err, res) => {
                console.debug(res.body)
                expect(res).to.have.status(400);
                done();
            });
    });

    it('Connection delete by id should delete and return', (done) => {
        chai.request(HOST)
            .get(`${RESOURCE}/TestMappingOne`)
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