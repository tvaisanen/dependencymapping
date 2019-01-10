const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const Connection = require('./Connection');

const assetSchema = new mongoose.Schema({
    _id: { type: ObjectId, auto: true },
    name: { type: String, unique: true, required: true},
    description: String,
    connected_to: [String],
    tags: [String],
    group: {type: String, default: ""},
    nodeShape: {type: String, default: "ellipse"},
    nodeColor: {type: String, default: "navyblue"}
});


assetSchema.post('save', (asset)  => {
    asset.connected_to.forEach(target => {
                const connection = new Connection({source: asset.name, target: target});
                connection.save()
                    .then()
                    .catch(err => console.log(`error saving connection: ${err}`))
            })
});

try {
    // Throws an error if "Name" hasn't been registered
    module.exports = mongoose.model('assets', assetSchema);
} catch (e) {
    module.exports = mongoose.model("assets")
}

