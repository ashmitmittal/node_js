var express = require("express");
const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var friends = ["Hiten","Pulkit","Vinayak","Ayush","Aarindam","Ankush","Jay"];

app.get("/",function(req,res)
{
    res.render("home");
});

app.post("/addfriend",function(req,res){
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.get("/friends",function(req,res)
{
    res.render("friends",{friends: friends});
});

app.listen(3000,function()
{
    console.log("Server start at port 3000");
});