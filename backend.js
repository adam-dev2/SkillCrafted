const express = require("express");
const app = express();
const mongoose = require('mongoose');
const port = 8080;

mongoose.connect('mongodb+srv://shaikadam642:PgHZU4iTiJtQlRgY@cluster0.wzj4d7w.mongodb.net/');

const db = mongoose.connection;
db.on('error',
console.error.bind(console,'Connection error: '));
db.once('open', () => {
    console.log("Conected to the database");
})
const userscheme = new mongoose.Schema({
    username : String,
    password : String
});

const teacherscheme = new mongoose.Schema({
    username : String,
    password : String
})

const usermodel = mongoose.model('usermodel',userscheme);
const teachermodel = mongoose.model('teachermodel',teacherscheme)
//////// USER Signup
app.post("/user/signup",(req,res) => {
    var username = req.body.username;
    var password = req.body.password;

})

app.listen(port,()=> {
    console.log(`Listening on port: ${port}`);
})