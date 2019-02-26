const mongoose = require('mongoose');
const {ObjectId, Types} = mongoose.Schema;

const Connection = require('./Connection');

const assetSchema = new mongoose.Schema({
    _id: {type: ObjectId, auto: true},
    name: {
        type: String,
        required: true,
    },
    description: String,
    connected_to: [String],
    tags: [String],
    group: {type: String, default: ""},
    nodeShape: {type: String, default: "ellipse"},
    nodeColor: {type: String, default: "navyblue"}
});


assetSchema.post('save', (asset) => {
    asset.connected_to.forEach(target => {
        const connection = new Connection({source: asset.name, target: target});
        connection
            .save()
            .then()
            .catch(err => console.log(`error saving connection: ${err}`))
    })
});





assetSchema.post('delete', (asset) => {
    console.log('\npost delete here \n')
    console.log(JSON.stringify(asset))
    Connection.find({$or: [{source: asset.name}, {target: asset.name}]});
    /*console.log(JSON.stringify(asset))
    asset.connected_to.forEach(target => {
        const connection = new Connection({source: asset.name, target: target});
        connection
            .save()
            .then()
            .catch(err => console.log(`error saving connection: ${err}`))
    })*/
    next();
});

try {
    // ! Remove the try catch from coverage
    // ! it affects the coverage percentage.
    // FOR TESTING WITH MOCHA --WATCH
    // Throws an error if "Name" hasn't been registered
    module.exports = mongoose.model('assets', assetSchema);
} catch (e) {
    module.exports = mongoose.model("assets")
}
