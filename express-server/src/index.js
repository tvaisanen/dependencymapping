const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const fs = require('fs');

const assetRouter = require('./routers/asset.router');
const mappingRouter = require('./routers/mapping.router');
const tagRouter = require('./routers/tag.router');

const { Asset, Tag, Mapping } = require('./models');

// require test data
const assets = require('./__test__/assets.json');
const mappings = require('./__test__/mappings.json');
const tags = require('./__test__/tags.json');


// connect to the db
const MONGO_PATH = process.env.MONGO_PATH;
const MONGO_PORT = process.env.MONGO_PORT;
const DB_NAME = process.env.DB_NAME;

mongoose.connect(`mongodb://${MONGO_PATH}:${MONGO_PORT}/${DB_NAME}`);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose successful connection:');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});


function loadDataToDb() {
    assets.forEach(item => {
        const asset = new Asset({...item});
        asset.save().then(saved => {
            console.log(`saved: ${saved.name}`);
        }).catch(err => {
            console.log(err);
        })
    });

    tags.forEach(item => {
        const tag = new Tag({...item});
        tag.save().then(saved => {
            console.log(`saved: ${saved.name}`);
        }).catch(err => {
            console.log(err);
        })
    });

    mappings.forEach(item => {
        const mapping = new Mapping({...item});
        mapping.save()
            .then(saved => console.log(`saved: ${saved.name}`))
            .catch(err => console.log(err))
    })
}


const router = express.Router();

router.use(function timeLog(req, res, next) {
    const d = new Date();
    //${d.toUTCString()},
    console.log(`\n${req.method} ::  ${req.path}, \n\tbody: ${JSON.stringify(req.body)}`);
    if (req.path.startsWith("/test")){
        console.log("access to test pages");
        console.log(process.cwd());

    }
    next();
});

router.get('/reset-models', (req, res) => {

    Asset.remove()
        .then(r => console.log(r))
        .catch(err => console.log(err));
     Tag.remove()
        .then(r => console.log(r))
        .catch(err => console.log(err));

     Mapping.remove()
         .then(r => console.log(r))
         .catch(err => console.log(err));

    loadDataToDb();

    res.send("database initialized")
});



/**
 * Configure App
 *
 */

let app = express();
app.use(bodyParser.urlencoded({extended: false}))



// serve test pages

app.use(router);
app.use('/test', express.static('src/pages'));
// serve API endpoints
app.use('/asset', assetRouter);
app.use('/mapping', mappingRouter);
app.use('/tag', tagRouter);

app.get('*', (req, res) => {
    res.status(404).send('Resource not found.')
});
// server misc

app.listen(3000, ()=> {
    console.log(
        `Dependency Mapping :: env: ${process.env.NODE_ENV}`
    );
});




