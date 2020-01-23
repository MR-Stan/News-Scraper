// Dependencies
const mongoose = require('mongoose');

// Saving a reference to Schema constructor
const Schema = mongoose.Schema;

// Creating a new object from the Schema constructor
const articleSchema = new Schema({
    // Article headline
    headline: {
        type: String,
        required: true
    },
    // Article summary
    summary: {
        type: String,
        required: true
    },
    // Article link
    link: {
        type: String,
        required: true
    }
});