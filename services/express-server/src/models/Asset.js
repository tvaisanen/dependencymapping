const mongoose = require('mongoose');
const _ = require('lodash');
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
    nodeColor: {type: String, default: "navyblue"},
});


assetSchema.post('save', (asset) => {
    console.log(`assetSchema.post('save', ${asset.name})`);
    asset.connected_to.forEach(target => {
        console.log(`create connection: {source: ${asset.name}, target:${target}}`);
        const newConnection = new Connection({source: asset.name, target: target});
        newConnection.save()
    });
});

assetSchema.post('findOneAndUpdate', (asset) => {
    console.log(`assetSchema.post('findOneAndUpdate', ${asset.name}`);
    syncAssetConnections(asset)
});

assetSchema.post('updateOne', (asset) => {
    console.log(`assetSchema.post('updateOne', ${asset.name})`);
    syncAssetConnections(asset)
});

function syncAssetConnections(asset) {
    console.log("Asset.syncAssetConnections");
    console.log("asset should have connection to these")
    const connectionsPromise = Connection.find({source: asset.name});

    connectionsPromise
        .then(connections => {
            const targetNames = connections.map(c => c.target);

            if (targetNames.length === 0) {
                console.log(asset.connected_to)
                asset.connected_to.forEach(target => {
                    console.log(`create connection: {source: ${asset.name}, target:${target}}`);
                    const newConnection = new Connection({source: asset.name, target: target});
                    newConnection.save()
                        .then(ok => console.log('saved'));
                });


            } else {

                console.log(`these should match: ${JSON.stringify(asset.connected_to)} == ${JSON.stringify(targetNames)}`)

                targetNames.forEach(target => {
                    const thisNeedsToBeDeleted = !_.includes(asset.connected_to, target);

                    console.log(`delete connection to: ${target} = ${thisNeedsToBeDeleted}`);
                    if (thisNeedsToBeDeleted) {
                        console.log(`deleting connection to ${target}`)
                        Connection.deleteOne({source: asset.name, target});
                    }
                });

                asset.connected_to.forEach(target => {

                    const thisNeedsToBeCreated = !_.includes(targetNames, target);

                    console.log(`create connection to: ${target} = ${thisNeedsToBeCreated}`);

                    if (thisNeedsToBeCreated) {
                        const newConnection = new Connection({source: asset.name, target: target});
                        newConnection.save();
                    }
                });
            }


        });

}

try {
    // ! Remove the try catch from coverage
    // ! it affects the coverage percentage.
    // FOR TESTING WITH MOCHA --WATCH
    // Throws an error if "Name" hasn't been registered
    module.exports = mongoose.model('assets', assetSchema);
} catch (e) {
    module.exports = mongoose.model("assets")
}
