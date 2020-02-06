// Dependencies
const mongoose = require('mongoose');

// Saving a reference to Schema constructor
const Schema = mongoose.Schema;

// Creating a new object from the Schema constructor
const ArticleSchema = new Schema({

    // Article date
    date: {
        type: String,
        required: true
    },

    // Article headline
    headline: {
        type: String,
        required: true,
        unique: true
    },

    // Article summary
    summary: {
        type: String,
        required: true,
    },

    // Article link
    link: {
        type: String,
        required: true
    },

    // Array of notes
    note: [{
        type: {
            type: Schema.Types.ObjectId,
            ref: 'Note'
        },
        article: String
    }],

    // Keeps track of whether or not the article's been saved
    saved: {
        type: Boolean,
        default: false
    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;