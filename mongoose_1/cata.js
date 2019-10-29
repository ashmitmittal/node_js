var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cat_app', {useNewUrlParser: true});

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat",catSchema);

//adding a new cat to the db

// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// george.save(function(err,cat){
//     if(err){
//         console.log("Something went wrong");
//     } else{
//         console.log("We just save to DB");
//         console.log(cat);
//     }
// });

Cat.create({
    name: "snow white",
    age: 15,
    temperament: "bland"
},function(err,cat){
    if(err){
        console.log("err");
    } else {
        console.log(cat);
    }
});


//retrive all cats from the db and console.log each one
Cat.find({},function(err,cats){
    if(err){
        console.log("OH NO, FUCKING ERROR!");
        console.log(err);
    } else {
        console.log("ALL THE CATS....");
        console.log(cats);
    }
});