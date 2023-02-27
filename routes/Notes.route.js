const express = require("express");
var jwt = require('jsonwebtoken');
const { NotesModule } = require("../models/Notes.module");
const { UserModel } = require("../models/User.model");
require('dotenv').config();
var ObjectId = require('mongodb').ObjectId;

const NotesController = express.Router();

const validateNote = (req, res, next) => {
    const {heading, note, tag} = req.body;
    if(heading?.trim() && note?.trim() && tag?.trim())
        next();
    else 
        res.send("All Fields are Required");
}

NotesController.get("/", (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, async function(err, decoded) {
        if(err)
            res.send("Invalid Creadentials, please login");
        else {
            const id = decoded.id;
            const notes = await NotesModule.find({userId: id});
            res.send(notes);
        }
    });
})

NotesController.post("/create", validateNote, (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, async function(err, decoded) {
        if(err)
            res.send("Invalid Creadentials, please login");
        else {
            const data = req.body;
            const payload = {
                ...data,
                userId : decoded.id
            }
            const note = new NotesModule(payload);
            await note.save();
            res.send("Note created Successfully");
        }
    });
})

NotesController.patch("/edit/:id", validateNote, (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, async function(err, decoded) {
        if(err)
            res.send("Invalid Creadentials, please login");
        else {
            const {id} = req.params;
            const {heading, note, tag} = req.body;
            const userId = decoded.id
            const updatedNote = {
                $set : {
                    heading,
                    note, 
                    tag
                }
            }
            console.log(userId);
            // const result = await NotesModule.findOne({_id:id, userId});
            const result = await NotesModule.findOneAndUpdate({_id:id, userId}, updatedNote);
            console.log(result);
            if(result)
                res.send("Note Updated Successfully");
            else 
                res.send("Note not found");
        }
    });
})


NotesController.delete("/delete/:id", (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, async function(err, decoded) {
        if(err)
            res.send("Invalid Creadentials, please login");
        else {
            const {id} = req.params;
            const userId = decoded.id;
            const result = await NotesModule.findOneAndDelete({_id:id, userId});
            console.log(result);
            if(result)
                res.send("Note Deleted Successfully");
            else 
                res.send("Note not found");
        }
    });
})

module.exports = {
    NotesController
}