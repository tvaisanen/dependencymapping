const chai = require('chai');
const chaiHttp = require('chai-http');

const {resetModels, loadDataToDB, clearDB} = require('../src/utils/testHandlers');
//const app = require('../src/index');

chai.use(chaiHttp);

const expect = chai.expect;


describe('Asset API endpoint ', function () {

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

        chai.request('http://localhost:3000/asset')
            .get('')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });

    });
});


