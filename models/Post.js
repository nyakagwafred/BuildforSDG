/* eslint-disable linebreak-style */
/* eslint-disable indent */
const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', PostSchema)