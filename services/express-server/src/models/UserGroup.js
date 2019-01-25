const mongoose = require('mongoose');
const {ObjectId, Types} = mongoose.Schema;


const userGroupSchema = new mongoose.Schema({
    _id: {type: ObjectId, auto: true},
    owner: {
        type: ObjectId,
        required: true,
    },
    admins: [ObjectId],
    users: [ObjectId],
});