const express = require("express");
const { UserModel } = require("../models/User.model");
var jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');

const UserController = express.Router();


UserController.get("/", (req, res) => {
    res.send("Auth Working");
})

UserController.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    if(user) {
        bcrypt.compare(password, user.password).then(function(result) {
            if(result) {
                var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
                res.send({"message": "LoggedIn Successfully", token});
            }
            else  
                res.send("Invalid Creadentials");
        });    
    }
    else  
        res.send("User doesn't Exists");
})

UserController.post("/register", async (req, res) => {
    const {name, email, password} = req.body;
    bcrypt.hash(password, 6).then(async function(hash) {
        const user = new UserModel({name, email, password:hash});
        console.log(user);
        await user.save();
        res.send("USer Registered Successfully");
    });
    
})

module.exports = {
    UserController
}