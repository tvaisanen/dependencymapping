const Asset = require('../../models').Asset;
const hal = require('../../utils/hal.utils');


function assetPutById(req, res){
    console.log(`asset.router.putById(${req.params.id})`);
    const query = {_id: req.params.id};

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

module.exports = assetPutById;