var express = require("express");
var app = express();


app.get("/",function(req,res){
    res.send("Hi there!, Welcome to my assignment");
});

app.get("/speak/:name",function(req, res){
    var sub = req.params.name.toLowerCase();
    // console.log(sub);
    if(sub == "pig")
    {
        res.send("The pig says 'Oink'");
    }
    else if(sub == "cow")
    {
        res.send("The cow says 'Mow'");
    }
    else if(sub == "dog"){
        res.send("The dog says 'Woof Woof!'");
    }
});

app.get("/repeat/:rep/:num",function(req, res){
    var rep = req.params.rep;
    var num = Number(req.params.num);
    var result = "";
    // console.log(num);
    for(var i=0; i< num;i++)
    {
        result+=rep+" ";
        // console.log(rep);
    }
    res.send(result);
});

app.get("*",function(req,res){
    res.send("Sorry page not found!.. what are you doing with your life?")
});

app.listen(3000,function(){
    console.log("server started at port 3000");
});