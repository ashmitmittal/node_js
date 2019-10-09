var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/",function(req,res){
    res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye",function(req,res){
    console.log("someone is here!");
    res.send("Goodbye!");
});

// "/dog" => "MEOW"
app.get("/dog",function(req,res){
    res.send("MEOW");
});

app.listen(3000,function(){
    console.log("server started at port 3000");
});