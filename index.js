const express = require("express");
const dotenv = require("dotenv");

const DbConnection = require('./databaseConnection.js');

const usersRoute = require('./routes/users.js');
const booksRoute = require('./routes/books.js');

dotenv.config();

const app = express(); //~ for creating the main application instance

DbConnection();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is running.",
        data: "hey",
    });
    //* .send can only send one response that's why we prefer json
    // res.status(200).send("Server is up.");
})

app.use('/users', usersRoute);
app.use('/books', booksRoute);
    


app.get("*", (req, res) => {
    res.status(404).json({
        message: "This route doesn't exist",
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})