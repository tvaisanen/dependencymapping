const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const connectionSchema = new mongoose.Schema({
    source: {type: String, required: true},
    target: {type: String, required: true},
    tags: {type: [String], default: null},
    description: {type: String, default: ""},
    targetArrow: {type: Boolean, default: true},
    sourceArrow: {type: Boolean, default: false},
    edgeLabel: {type: String, default: ""}
});

connectionSchema.methods.removeReferenceFromTheSourceAsset = function (target)  {
    console.log("connectionSchema.methods.removeReferenceFromTheSourceAsset()");
    console.log("\n ########### here with connectionschema method ##########");
    console.log(this)
    this.model('assets')
        .findOneAndUpdate({name: this.source}, { $pullAll: {connected_to: [this.target]}})
        .then(asset => {
            console.log('updated asset')
            console.log(asset)
        })
}

connectionSchema.post('findOneAndDelete', (connection) => {
    console.log(`connectionSchema.post('findOneAndDelete', ${connection._id}`);
    connection.removeReferenceFromTheSourceAsset()
});



try {
    // Throws an error if "Name" hasn't been registered

    module.exports =  mongoose.model('connections', connectionSchema);
} catch (e) {
    module.exports = mongoose.model("connections")
}