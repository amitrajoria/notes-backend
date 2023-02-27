const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
    userId : {type: String, required: true},
    heading : {type: String, required: true},
    note : {type: String, required: true},
    tag : {type: String, required: true}
}, {
    versionKey : false,
    timestamps : true
})

const NotesModule = mongoose.model("notes", notesSchema);

module.exports = {
    NotesModule
}