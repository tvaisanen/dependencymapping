const {Asset, Tag} = require('../../models');
const hal = require('../../utils/hal.utils');

function assetGetById(req, res) {

    // if id provided, get detail
    if (req.params.id) {

        Asset.findOne({_id: req.params.id})

            .then(asset => {
                if (!asset) {
                    res.status(404).json("Resource does not exist.")
                } else {

                    // Models needs to be refactored to avoid
                    // this kind of patching.

                    Promise.all([
                        // get target assets
                        Asset.find({name: {$in: asset.connected_to}}),
                        // get tags
                        Tag.find({name: {$in: asset.tags}}),
                        // if grouped find the parent
                        asset.group ? Asset.findOne({name: asset.group}) : null
                    ]).then(([targetResults, tagResults, parent]) => {

                            const assetWithPointers = {
                                ...asset._doc,
                                connected_to: targetResults.map(target => ({
                                    _id: target._id,
                                    name: target.name
                                })),
                                tags: tagResults.map(tag => ({
                                    _id: tag._id,
                                    name: tag.name
                                })),
                                group: parent
                            };


                            const halAsset = hal.serializeAssetWithPointers(req.headers.host, assetWithPointers);
                            res.status(200).json(halAsset);
                        }
                    )
                    ;


                }

            }).catch(err => res.status(400).json(err));
    }
}

module.exports = assetGetById;