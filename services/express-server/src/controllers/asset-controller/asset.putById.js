const {Asset, Connection} = require('../../models');
const hal = require('../../utils/hal.utils');


function assetPutById(req, res) {
    console.log(`asset.router.putById(${req.params.id})`);
    const query = {_id: req.params.id};

    Asset.updateOne(query, req.body)

        .then(ok => {
            Asset.findOne(query)
                .then(asset => {

                    Connection.find({source: asset.name})
                        .then(connections => {
                            console.log(asset.name);
                            console.log(connections);
                            console.log(connections.map(c => c.name))
                        });

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

    /*
        Asset.findOneAndUpdate(query, req.body)
            .then(asset => {

                Connection.find({source: asset.name})
                    .then(connections => {
                        console.log(asset.name);
                        console.log(connections)
                        console.log(connections.map(c => c.name))
                    });

                const halAsset = hal
                    .serializeAsset(req.headers.host, asset);

                res.status(200).json(halAsset);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
            */
}

module.exports = assetPutById;