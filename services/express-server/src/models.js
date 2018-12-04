const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    name: String,
    belongs_to: String,
    description: String,
    connected_to: [String],
    tags: [String],
    group: {type: String, default: ""},
    nodeShape: {type: String, default: "ellipse"},
    nodeColor: {type: String, default: "navyblue"}
});

const mappingSchema = new mongoose.Schema({
    name: String,
    description: String,
    assets: [String],
    tags: [String],
    grouped: {type: [String], default: []}
});

const tagSchema = new mongoose.Schema({
    name: String,
    description: String
});

const groupSchema = new mongoose.Schema({
    name: String,
});

const Asset = mongoose.model('Asset', assetSchema);
const Mapping = mongoose.model('Mapping', mappingSchema);
const Tag = mongoose.model('Tag', tagSchema);
const AssetGroup = mongoose.model('AssetGroup', groupSchema);


module.exports = {
    Asset: Asset,
    AssetGroup: AssetGroup,
    Mapping: Mapping,
    Tag: Tag
};