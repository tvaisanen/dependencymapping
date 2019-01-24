const mongoose = require('mongoose');
const {ObjectId, Types} = mongoose.Schema;


const userSchema = new mongoose.Schema({
    _id: {type: ObjectId, auto: true},
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    usergroups: [ObjectId],
    projects: [ObjectId]
});