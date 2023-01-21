//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
var encrypt = require('mongoose-encryption');




//fetching mongoose user schema 
const User = require("./schemas/userSchema");

const app = express();

// console.log(process.env.API_KEY);


app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

const port = 3000;

mongoose.connect("mongodb://localhost/userDB", ()=>{
    console.log("server connected to the database");
});


app.get("/", (req,res)=>{
    res.render("home"); 
})



app.get("/login", (req,res)=>{
    res.render("login"); 
})




app.get("/register", (req,res)=>{
    res.render("register"); 
})


app.get("/logout", (req,res)=>{
    res.render("home");
})




app.post("/register", (req,res)=>{
     const newUser = new User({
        email: req.body.username,
        password: req.body.password
     });

     newUser.save((err)=>{
        if(!err){
            res.render("secrets")
        } else{
            console.log(err);
        }
     });
});



app.post("/login",(req,res)=>{
    const userName = req.body.username;
    const userPassword = req.body.password;
    User.findOne({email: userName}, (err, foundUser)=>{
        if(err){
            console.log(err.message);
        } else{
            if(foundUser){
                if(foundUser.password === userPassword){
                    res.render("secrets");
                }
            }
        } 
    });
});



app.listen(port, ()=>{
    console.log(`server started at http://localhost:${port}`);
})
