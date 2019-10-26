var express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/",function(req,res)
{
    res.render("home");
});

app.post("/addfriend",function(req,res){
    res.send("YOU REACHED POST ROUTE");
})

app.get("/friends",function(req,res)
{
    var friends = ["Hiten","Pulkit","Vinayak","Ayush","Aarindam","Ankush","Jay"];
    res.render("friends",{friends: friends});
});

app.listen(3000,function()
{
    console.log("Server start at port 3000");
});