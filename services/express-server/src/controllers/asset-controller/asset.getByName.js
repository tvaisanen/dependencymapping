const Asset = require('../../models').Asset;
const hal = require('../../utils/hal.utils');

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