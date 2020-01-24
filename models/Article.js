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

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;