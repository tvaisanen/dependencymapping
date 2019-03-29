const { Mapping, Asset, Tag } = require('../../models');
const hal = require('../../utils/hal.utils');
const _ = require('lodash');

function mappingGet(req, res) {
    console.log(req.headers)
    Promise.all([
        Mapping.find(),
        Asset.find(),
        Tag.find()
    ]).then(([mappings, assets, tags]) => {
        console.log(tags)

        const HALMappings = mappings.map(mapping => {
            const mappingWithAssetDetail = {
                ...mapping._doc,
                assets: assets
                    .filter(asset => mapping.assets.indexOf(asset.name) !== -1)
                    .map(asset => ({name: asset.name, _id: asset._id})),
                tags: tags
                    .filter(tag => mapping.tags.indexOf(tag.name) !== -1)
                    .map(tag => ({name: tag.name, _id: tag._id})),
            };

            return hal.serializeMappingWithAssetIDs(req.headers.host, mappingWithAssetDetail)
        });

        res.status(200).json(HALMappings);

    }).catch(err => {
        console.log(err)
        res.send(err)
    });

}

module.exports = mappingGet;