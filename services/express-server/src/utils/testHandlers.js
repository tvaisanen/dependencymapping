const { Asset, Connection, Tag, Mapping } = require('../models');


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

async function clearDB () {
    await Asset.collection.drop();
    await Connection.collection.drop();
    await Tag.collection.drop();
    await Mapping.collection.drop();
}



module.exports = {
    resetModels: resetModels,
    clearDB: clearDB,
    loadDataToDB: loadDataToDb
};