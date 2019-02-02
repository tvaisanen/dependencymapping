const {Asset, Connection, Tag, Mapping} = require('../models');
const Router = require('express').Router;
const mongoose = require('mongoose');

const testHandlersRouter = Router();

// TEST DATA
const assets = require(`../__test__/unit-tests/assets.json`);
const mappings = require(`../__test__/unit-tests/mappings.json`);
const tags = require(`../__test__/unit-tests/tags.json`);


async function resetModels() {
    try {
        await clearDB();
        await loadDataToDb();
    } catch (err) {
        console.error(err)
    }
}

async function loadDataToDb() {
    assets.forEach(item => {
        const asset = new Asset({...item});

        asset.save()
            .then()
            .catch(err => {
                console.log(err);
            })
    });

    tags.forEach(item => {
        const tag = new Tag({...item});
        tag.save().then(saved => {
        }).catch(err => {
            console.log(err);
        })
    });

    mappings.forEach(item => {
        const mapping = new Mapping({...item});
        mapping.save()
            .then()
            .catch(err => console.log(err))
    })
}

async function clearDB() {
    try {
        await Asset.collection.drop();
    } catch (e) {
        console.error("Asset collection did not get cleared.")
        console.error(e)
    }
    try {
        await Connection.collection.drop();
    } catch (e) {
    }
    try {
        await Tag.collection.drop();
    } catch (e) {
    }
    try {
        await Mapping.collection.drop();
    } catch (e) {
    }


    console.log("\n\nCLEARED DB\n\n");
}


testHandlersRouter.use(function timeLog(req, res, next) {
    const d = new Date();
    //${d.toUTCString()},
    console.log(`${JSON.stringify(req.headers)}`);
    console.log(`\n${req.method} ::  ${req.path}, \n\tbody: ${JSON.stringify(req.body)}`);
    console.log(req.query);
    next();
});

testHandlersRouter.get('/purge-data', (req, res) => {
    clearDB();
    res.send("Database cleared")
});



testHandlersRouter.get('/reset-models', (req, res) => {
    resetModels(req,res)
    res.send("Test data reseted.")
});

module.exports = {
    resetModels: resetModels,
    clearDB: clearDB,
    loadDataToDB: loadDataToDb,
    testRoutes: testHandlersRouter
};