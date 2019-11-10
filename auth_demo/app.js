const express = require("express");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/auth_demo', {useNewUrlParser: true});

const app = express();
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("home");
});

app.get("/secret",function(req,res){
    res.render("secret");
});

app.listen(3000,function(){
    console.log("Server start at port 3000");
});