const Asset = require('../models').Asset;
const hal = require('../utils/hal.utils');

function get(req, res) {

        console.log(req.query)
        Asset.find(req.query)
            .then(assets => {
                console.log(assets)
                const serializedContent = assets.map(
                        asset => hal.serializeAsset(req.headers.host, asset)
                    );
                res.json(serializedContent)
            })
            .catch(err => res.send(err));

}

function post (req, res){

    const asset = new Asset(req.body);


    if (!asset.name) {
        console.log(asset)
        res.status(400).json({error: "name is required field"})

    } else {

        Asset.findOne({name: asset.name})
            .then(existing => {
                if (existing) {
                    res.status(409).json({
                        error: `Asset ${existing.name} already exists.`,
                        pathToExisting: `/asset/${existing.name}`
                    });
                } else {
                    asset.save().then(saved => {
                        const halAsset = hal.serializeAsset(`${req.headers.host}`, saved);
                        res.status(201).send(halAsset);
                    }).catch(err => {
                        console.log(err);
                    })
                }
            })
            .catch(err => {
                console.log(`err: ${err}`)
            });
    }
}

function getById(req, res) {

    // if id provided, get detail
    if (req.params.id) {
        Asset.findOne({_id: req.params.id})

            .then(asset => {
                if (!asset) {
                    res.status(404).json("Resource does not exist.")
                } else {
                    const halAsset = hal.serializeAsset(req.headers.host, asset);
                    res.status(200).json(halAsset);
                }

            }).catch(err => res.status(400).json(err));
    }
}

function getByName(req, res) {

    // if id provided, get detail
    if (req.params.id) {
        Asset.findOne({_id: req.params.id})

            .then(asset => {
                if (!asset) {
                    res.status(404).json("Resource does not exist.")
                } else {
                    const halAsset = hal.serializeAsset(req.headers.host, asset);
                    res.status(200).json(halAsset);
                }

            }).catch(err => res.status(400).json(err));
    }
}



function put(req, res){

    const query = {name: req.params.id};

    Asset.updateOne(query, req.body)

        .then(ok => {
            Asset.findOne(query)
                .then(asset => {

                    const halAsset = hal
                        .serializeAsset(req.headers.host, asset);

                    res.status(200).json(halAsset);
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json(err)
                })
        })
        .catch(err => res.status(400).send(err));
}

// delete is a reserved keyword
function deleteAsset(req, res){
    const query = {name: req.params.id};
    Asset.remove(query)
        .then(ok => {
            res.status(204).json();
        })
        .catch(err => res.status(400).json(err))
}

module.exports = {
    get,
    getById,
    post,
    put,
    delete: deleteAsset
};