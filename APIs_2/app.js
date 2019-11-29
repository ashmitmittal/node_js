const express = require("express");
const app = express();
var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");

var todoRoutes = require("./routes/todos");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api/todos',todoRoutes);

app.get("/",function(req,res){
    res.send('hello');
});


app.listen(port,function(){
    console.log("Running on PORT "+port);
})