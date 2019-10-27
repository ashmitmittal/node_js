const express = require("express");
const app = express();
const request = require("request");
app.set("view engine","ejs");

app.use(express.static("public"));

app.get("/",function(req,res){
    res.render("search");
});

app.get("/results",function(req,res){
    var result=req.query.search;
    var url = "http://www.omdbapi.com/?s="+result+"&apikey=f10fff11";
    request(url,function(error,response,body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            // res.send(parsedData["Search"][0]["Title"]);
            res.render("results",{data: data});
        }
    });
});


app.listen(3000,function(){
    console.log("Server sarted at port 3000!");
});