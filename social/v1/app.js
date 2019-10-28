const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.set("view engine","ejs");


var posts = [
    {name: "Ashi",image: "https://i.pinimg.com/236x/63/d2/4b/63d24b8198b2a949faf73b7886886d15.jpg"},
    {name: "Archi",image: "https://i.pinimg.com/236x/dc/9f/25/dc9f251d735fac3d8a8497773a30a1ba.jpg"},
    {name: "Noni",image: "https://i.pinimg.com/236x/bd/2f/fa/bd2ffaa2743f756e7177795d16da9a8b.jpg"},
    {name: "Ashi",image: "https://i.pinimg.com/236x/63/d2/4b/63d24b8198b2a949faf73b7886886d15.jpg"},
    {name: "Archi",image: "https://i.pinimg.com/236x/dc/9f/25/dc9f251d735fac3d8a8497773a30a1ba.jpg"},
    {name: "Noni",image: "https://i.pinimg.com/236x/bd/2f/fa/bd2ffaa2743f756e7177795d16da9a8b.jpg"}
]


app.get("/",function(req,res){
    res.render("landing");
});

app.get("/posts",function(req,res){ //campgrounds
    res.render("posts",{posts: posts});
});

app.post("/posts",function(req,res){
    //get data from form and add to posts
    var name = req.body.name;
    var image = req.body.image;
    var newPosts = {name:name, image: image};
    posts.push(newPosts);
    //redirect
    res.redirect("/posts");
});

app.get("/posts/new",function(req,res){
    res.render("new");
});

app.listen(3000,function(){
    console.log("Social app started at port 3000!");
});