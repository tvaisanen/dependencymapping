const Asset = require('../../models').Asset;
const hal = require('../../utils/hal.utils');


function assetGet(req, res) {
        Asset.find(req.query)
            .then(assets => {
                const serializedContent = assets.map(
                        asset => hal.serializeAsset(req.headers.host, asset)
                    );
                res.json(serializedContent)
            })
            .catch(err => res.send(err));

}

module.exports = assetGet;