const Asset = require('../../models').Asset;
const hal = require('../../utils/hal.utils');
const config = require('../../utils/configs');
//const { broadcastToClients } = require('../../socket/');

function assetPost(req, res){

    const asset = new Asset(req.body);

    console.log("assetRouter.post()");
    console.log(asset);

    if (!asset.name) {
        console.log(asset)
        res.status(400).json({error: "name is required field"})

    } else {

        Asset.findOne({name: asset.name})
            .then(existing => {
                if (existing) {
                    res
                        .status(409)
                        .set('Location', `${config.API_PATH}/asset/${existing.name}`)
                        .json({msg: "Conflict"});
                } else {
                    asset
                        .save()
                        .then(saved => {
                            const halAsset = hal.serializeAsset(`${req.headers.host}`, saved);
                            //broadcastToClients(`new asset, plz run: assetActions.getAssetById('${saved._id}')`);
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

module.exports = assetPost;
