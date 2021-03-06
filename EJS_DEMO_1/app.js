var express = require("express");
var app = express();

app.get("/",function(req, res){
    res.render("home.ejs");
});

app.get("/posts",function(req, res){
    var posts =[
        {title:"half girlfriend",author:"chetan bhagat"},
        {title: "the bad blood",author:"john carreyrou"}
    ];
    res.render("posts.ejs",{posts:posts});
});

app.get("/fellinlovewith/:thing",function(req, res){
    var thing = req.params.thing;
    res.render("love.ejs",{thingVar: thing});
});

app.listen(3000,function(){
    console.log("Running on port 3000");
});