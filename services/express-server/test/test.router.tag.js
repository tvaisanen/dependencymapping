const chai = require('chai');
const chaiHttp = require('chai-http');
const assetRouter = require('../src/routers/asset.router');

const {resetModels, loadDataToDB, clearDB} = require('../src/utils/testHandlers');
//const app = require('../src/index');

chai.use(chaiHttp);

const HOST = 'http://localhost:3000';

const expect = chai.expect;


describe('Tag API endpoint: test.router.tag.js ', function () {

    before(async function () {
        await resetModels();
    });

    after(async function () {
        // await clearDB();
    });


    beforeEach(async function () {
        //await resetModels();
        console.log('before each load data to db')
    });

    afterEach(async function () {
        //await clearDB();
        console.log('after each clear data from db')
    });

    it('gets asset by name', function (done) {

        chai.request(HOST)
            .get('/tag')
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


    it('post returns 400 if asset does not have a name', (done) => {
        chai.request(HOST)
            .post("/tag")
            .send({})
            .end((err, res) => {

                expect(res).to.have.status(400);

                done();
            });
    });

});

