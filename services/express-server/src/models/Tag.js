const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String
});

try {
    // Throws an error if "Name" hasn't been registered
    module.exports =  mongoose.model('tags', tagSchema);
} catch (e) {
    module.exports = mongoose.model("tags")
}