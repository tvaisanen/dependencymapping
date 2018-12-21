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

assetSchema.post('save', (asset)  => {
    console.log('create connections after saving');
    asset.connected_to.forEach(target => {
                const connection = new Connection({source: asset.name, target: target});
                connection.save()
                    .then(saved => console.log(saved))
                    .catch(err => console.log(`error saving connection: ${err}`))
            })
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

const connectionSchema = new mongoose.Schema({
    source: {type: String, required: true},
    target: {type: String, required: true},
    tags: {type: [String], default: null},
    description: {type: String, default: ""},
    targetArrow: {type: Boolean, default: false},
    sourceArrow: {type: Boolean, default: false},
    edgeLabel: String
});

const groupSchema = new mongoose.Schema({
    name: String,
});

const Asset = mongoose.model('Asset', assetSchema);
const Connection = mongoose.model('Connection', connectionSchema);
const Mapping = mongoose.model('Mapping', mappingSchema);
const Tag = mongoose.model('Tag', tagSchema);
const AssetGroup = mongoose.model('AssetGroup', groupSchema);


module.exports = {
    Asset: Asset,
    AssetGroup: AssetGroup,
    Connection: Connection,
    Mapping: Mapping,
    Tag: Tag
};