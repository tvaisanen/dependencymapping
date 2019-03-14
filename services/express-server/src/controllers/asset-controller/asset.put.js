const Asset = require('../../models').Asset;
const hal = require('../../utils/hal.utils');


function assetPut(req, res){

    const query = {name: req.params.id};

    Asset.findOneAndUpdate(query, req.body)

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

module.exports = assetPut;