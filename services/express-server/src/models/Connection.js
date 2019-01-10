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



try {
    // Throws an error if "Name" hasn't been registered

    module.exports =  mongoose.model('connections', connectionSchema);
} catch (e) {
    module.exports = mongoose.model("connections")
}