var express = require("express");
const app = express();
var multer = require("multer");
var upload = multer({dest: 'uploads/'});

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("index");
});

app.post("/profile",upload.single('filee'),function(req,res,next){
    console.log("successfuly uploaded a file");
    res.redirect("/");
});

app.listen(3000,function(){
    console.log("server start at port 3000");
});