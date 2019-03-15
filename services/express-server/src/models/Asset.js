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
    nodeColor: {type: String, default: "navyblue"}
});


assetSchema.post('save', (asset) => {
    console.log("\tassetSchema.post('save', asset)");
    console.log(asset);
    syncAssetConnections(asset)
    /*
    asset.connected_to.forEach(target => {
        const connection = new Connection({source: asset.name, target: target});
        try {
            connection.save(() => {
                console.log("saved connection:");
                console.log(connection)
            })
        } catch (err) {
            console.error("error saving connection")
        }
    })*/
});

assetSchema.post('findOneAndUpdate', (asset) => {
    console.log("assetSchema.post('findOneAndUpdate', asset)");
    console.log(asset)
    syncAssetConnections(asset)

    /*
    asset.connected_to.forEach(target => {
        const connection = new Connection({source: asset.name, target: target});
        console.log(connection)
        try {
            connection.save(() => console.log("connectionSaved"))
        } catch (err) {
            console.error("error saving connection")
            console.error(err)
        }
    })*/
});

assetSchema.post('updateOne', (asset) => {
    console.log("assetSchema.post('updateOne', asset)");
    console.log(asset)
    syncAssetConnections(asset)
    /*
    asset.connected_to.forEach(target => {
        const connection = new Connection({source: asset.name, target: target});
        console.log(connection)
        try {
            connection.save(() => console.log("connectionSaved"))
        } catch (err){
            console.error("error saving connection")
            console.error(err)
        }
    })*/
});

function syncAssetConnections(asset) {
    console.log("Asset.syncAssetConnections");
    console.log("asset should have connection to these")
    const connectionsPromise = Connection.find({source: asset.name});

    connectionsPromise
        .then(connections => {
            const targetNames = connections.map(c => c.target);

            console.log(`these should match: ${asset.connected_to} == ${targetNames}`)

            targetNames.forEach(target => {
                const thisNeedsToBeDeleted = !_.includes(asset.connected_to, target);

                console.log(`delete connection to: ${target} = ${thisNeedsToBeDeleted}`);
                if (thisNeedsToBeDeleted){
                    console.log(`deleting connection to ${target}`)
                    Connection.deleteOne({source: asset.name, target});
                }
            });

            asset.connected_to.forEach(target => {

                const thisNeedsToBeCreated = !_.includes(targetNames, target);

                console.log(`create connection to: ${target} = ${thisNeedsToBeCreated}`);

                if ( thisNeedsToBeCreated){
                    const newConnection = new Connection({source: asset.name, target: target});
                    newConnection.save();
                }
            });

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
