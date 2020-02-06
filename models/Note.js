// Dependencies
const mongoose = require("mongoose");

// Saving a reference to Schema constructor
const Schema = mongoose.Schema;

// Creating a new object from the Schema constructor
const NoteSchema = new Schema({

    // Note title
    title: {
        type: String,
        required: true
    },
    
    // Note body
    body: {
        type: String,
        required: true
    }
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;