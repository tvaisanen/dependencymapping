const mongoose = require('mongoose');
const {ObjectId, Types} = mongoose.Schema;

const pointerSchema = new mongoose.Schema({
   _id: ObjectId,
    name: String,
    href: String
})

try {
    // ! Remove the try catch from coverage
    // ! it affects the coverage percentage.
    // FOR TESTING WITH MOCHA --WATCH
    // Throws an error if "Name" hasn't been registered
    module.exports = {
        Pointer: mongoose.model('pointers', pointerSchema),
        pointerSchema,
    }
} catch (e) {
    module.exports = {
        Pointer: mongoose.model("pointers"),
        pointerSchema,
    }
}

