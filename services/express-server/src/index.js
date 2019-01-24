const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const assetRouter = require('./routers/asset.router');
const assetGroupRouter = require('./routers/asset-group.router');
const mappingRouter = require('./routers/mapping.router');
const tagRouter = require('./routers/tag.router');
const connectionRouter = require('./routers/connection.router');

const testHandlers = require('./utils/testHandlers');



const initDatabaseConnection = require('./database');

initDatabaseConnection();




const router = express.Router();

router.use(function timeLog(req, res, next) {
    const d = new Date();
    //${d.toUTCString()},
    console.log(`${JSON.stringify(req.headers)}`);
    console.log(`\n${req.method} ::  ${req.path}, \n\tbody: ${JSON.stringify(req.body)}`);
    console.log(req.query);
    next();
});

router.get('/purge-data', (req, res) => {
    testHandlers.clearDB();
    res.send("Database cleared")
});



router.get('/reset-models', (req, res) => {
    testHandlers.resetModels(req,res)
    res.send("Test data reseted.")
});




/**
 * Configure App
 *
 */

let app = express();
app.use(cors());
app.use(bodyParser.json());


// serve test pages

app.use(router);
app.use('/test', express.static('src/pages'));
// serve API endpoints
app.use('/asset', assetRouter);
app.use('/mapping', mappingRouter);
app.use('/tag', tagRouter);
app.use('/connection', connectionRouter);

app.get('*', (req, res) => {
    res.status(404).send('Resource not found.')
});
// server misc

app.listen(3000, ()=> {
    console.log(
        `Dependency Mapping :: env: ${process.env.NODE_ENV}`
    );
});

module.exports = app;




