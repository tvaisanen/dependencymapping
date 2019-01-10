const { Asset, Connection, Tag, Mapping } = require('../models');


// TEST DATA
const assets = require(`../__test__/unit-tests/assets.json`);
const mappings = require(`../__test__/unit-tests/mappings.json`);
const tags = require(`../__test__/unit-tests/tags.json`);


function resetModels() {
    try {

        clearDB();
        loadDataToDb();
    } catch (err) {
        console.error(err)
    }
}

function loadDataToDb() {
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

function clearDB () {
    Asset.collection.drop();
    Connection.collection.drop();
    Tag.collection.drop();
    Mapping.collection.drop();
}



module.exports = {
    resetModels: resetModels,
    clearDB: clearDB,
};