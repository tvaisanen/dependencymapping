const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const mappingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    assets: [String],
    tags: [String],
});

try {
    // Throws an error if "Name" hasn't been registered
    module.exports =  mongoose.model('mappings', mappingSchema);
} catch (e) {
    module.exports = mongoose.model("mappings")
}