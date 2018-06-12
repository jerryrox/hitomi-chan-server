let mongoose = require("mongoose");

let schema = mongoose.Schema({
    // Gallery ID
    id: {
        type: Number,
        required: true,
        unique: true
    },
    // Name
    n: {
        type: String,
        required: false
    },
    // Type
    type: {
        type: String,
        required: false
    },
    // Language
    l: {
        type: String,
        required: false
    },
    // Characters
    c: [{
        type: String,
        required: false
    }],
    // Series
    p: [{
        type: String,
        required: false
    }],
    // Tags
    t: [{
        type: String,
        required: false
    }],
    // Groups
    g: [{
        type: String,
        required: false
    }],
    // Authors
    a: [{
        type: String,
        required: false
    }]
});
schema.index({
    id: -1
});

let Gallery = module.exports = mongoose.model("Gallery", schema);