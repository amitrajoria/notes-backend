const express = require("express");
const { connection } = require("./config/db");
const { UserController } = require("./routes/Auth.route");
const { NotesController } = require("./routes/Notes.route");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home page");
})

app.use('/auth', UserController);
app.use('/notes', NotesController);

app.listen("8000", async () => {
    try {
        await connection;
        console.log("Connected to Database");
    }
    catch (err) {
        console.log("Error in database connection ", err.message);
    }
    console.log("Server listening on 8000");
})