// Dependencies
const mongoose = require("mongoose");

// Saving a reference to Schema constructor
const Schema = mongoose.Schema;

// Creating a new object from the Schema constructor
const NoteSchema = new Schema({
    // Note title
    title: String,
    // Note body
    body: String
});

// This creates our model from the above schema, using mongoose's model method
const Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;