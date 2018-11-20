const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    name: String,
    description: String,
    connected_to: [String],
    tags: [String],
});

const mappingSchema = new mongoose.Schema({
    name: String,
    description: String,
    assets: [String],
    tags: [String]
});

const tagSchema = new mongoose.Schema({
    name: String,
    description: String
});

const Asset = mongoose.model('Asset', assetSchema);
const Mapping = mongoose.model('Mapping', mappingSchema);
const Tag = mongoose.model('Tag', tagSchema);


module.exports = {
    Asset: Asset,
    Mapping: Mapping,
    Tag: Tag
};