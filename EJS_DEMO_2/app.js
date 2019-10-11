var express = require("express");
var app = express();

app.get("/",function(req, res){
    res.render("home");
});

app.use(express.static("public"));

app.set("view engine", "ejs"); //  by writing this we don't want to add .ejs on files

app.get("/posts",function(req, res){
    var posts =[
        {title:"half girlfriend",author:"chetan bhagat"},
        {title: "the bad blood",author:"john carreyrou"}
    ];
    res.render("posts",{posts:posts});
});

app.get("/fellinlovewith/:thing",function(req, res){
    var thing = req.params.thing;
    res.render("love",{thingVar: thing});
});

app.listen(3000,function(){
    console.log("Running on port 3000");
});