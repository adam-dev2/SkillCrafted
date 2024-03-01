const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const app = express();
const port = 8080;

app.use(bodyParser.json())
mongoose.connect('mongodb+srv://shaikadam642:PgHZU4iTiJtQlRgY@cluster0.wzj4d7w.mongodb.net/users');

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

const coursescheme = new mongoose.Schema({
    teacher : String,
    title : String,
    description : String,
    price : Number
})

const usermodel = mongoose.model('usermodel',userscheme);
const teachermodel = mongoose.model('teachermodel',teacherscheme);
const coursemodel = mongoose.model('coursemodel', coursescheme);


async function authenticate(req,res,next)
{
    var username = req.body.username;
    var password = req.body.password;

    if(await teachermodel.findOne({username : username}))
    {
        await teachermodel.findOne({password : password}) ? next() : res.send("NOT FOUND").status(404);
    }
    else
    {
        res.send("TEACHER name not found").status(404);
    }
    
}


//////// USER Signup
app.post("/user/signup",(req,res) => {
    var username = req.body.username;
    var password = req.body.password;

    const obj = {
        username : req.body.username,
        password : req.body.password
   }
   const secretkey = "S3cr3t";
   const token = jwt.sign(obj,secretkey,{expiresIn : '1h'});
   
   const user = new usermodel({
    username : username,
    password : password
    })

    user.save();
    res.send(user).status(200);
})
//////// USER LOGIN
app.post("/user/login",async(req,res) => {
    var username = req.body.username;
    var password = req.body.password;

    if(await usermodel.findOne({username : username}))
    {
        await usermodel.findOne({password : password}) ? (console.log("found the user")) : (console.log("WRONG PASSWORD"))
    }
    else
    {
        console.log("User name not found")
    }
    res.send(username);

})

//////// TEACHER Signup
app.post("/teacher/signup",(req,res) => {
    var username = req.body.username;
    var password = req.body.password

    const obj = {
        username : req.body.username,
        password : req.body.password
   }
   const secretkey = "S3cr3t";
   const token = jwt.sign(obj,secretkey,{expiresIn : '1h'});

    const teacher = new teachermodel({
        username : username,
        password : password
    })

    teacher.save();
    res.send(teacher).status(200);
})
//////// TEACHER LOGIN
app.post("/teacher/login",async(req,res) => {
    var username = req.body.username;
    var password = req.body.password;

    if(await teachermodel.findOne({username : username}))
    {
        await teachermodel.findOne({password : password}) ? (console.log("found the TEACHER")) : (console.log("WRONG PASSWORD"))
    }
    else
    {
        console.log("TEACHER name not found")
    }
    res.send(username);

})
//////// TEACHER CREATE COURSE
app.post("/teacher/course",authenticate,(req,res) => {
    var title = req.body.title;
    var description = req.body.description;
    var price = req.body.price;

    var course = new coursemodel({
        teacher : req.body.username,
        title : title,
        description : description,
        price : price
    })

    course.save();
    res.send(course).status(200);

})
//////// TEACHER UPDATE COURSE
app.put("/teacher/course/:title",authenticate,async(req,res) => {
    var title = req.params.title;
    if(await coursemodel.findOne({title : title}))
    {
        var filter = {title : title};
        var update = { $set : {title : req.body.title, description : req.body.description, price : req.body.price}};
        await coursemodel.updateOne(filter,update)
    }
    else
    {
        res.send("can't find the course").status(404);
    }
    res.send("Updated the course").status(200)
})
//////// TEACHER VIEW COURSE
app.get("/teacher/course",authenticate,async(req,res) => {
    if(await coursemodel.find({teacher : req.body.username}))
    {
        var x = (await coursemodel.find({teacher : req.body.username}))
        res.send(`${x}`).status(200)
    }
    else
    {
        res.send("no courses").status(404);
    }
})
app.listen(port,()=> {
    console.log(`Listening on port: ${port}`);
})