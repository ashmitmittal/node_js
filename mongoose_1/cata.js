var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cat_app', {useNewUrlParser: true});

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat",catSchema);

//adding a new cat to the db

var george = new Cat({
    name: "George",
    age: 11,
    temperament: "Grouchy"
});

george.save(function(err,cat){
    if(err){
        console.log("Something went wrong");
    } else{
        console.log("We just save to DB");
        console.log(cat);
    }
});