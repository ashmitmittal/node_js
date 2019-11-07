var mongoose = require("mongoose");
var Post = require("./models/post");
var Comment = require("./models/comment");

var data = [
    {
        name: "Ashi",
        image:"https://i.pinimg.com/236x/63/d2/4b/63d24b8198b2a949faf73b7886886d15.jpg",
        description:"Handsome Guy"
    },
    {
        name: "Archi",
        image:"https://i.pinimg.com/236x/dc/9f/25/dc9f251d735fac3d8a8497773a30a1ba.jpg",
        description:"Beautiful girl"
    }
]

function seedDB(){
    //remove all posts
    Post.deleteMany({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed");
        //add a few posts
        data.forEach(function(seed){
            Post.create(seed,function(err,post){
                if(err){
                    console.log(err);
                } else{
                    console.log("Added a post");
                    //create a comment
                    Comment.create({
                        text: "I wish that i can met him one day",
                        author:"Ashmit"
                    },function(err,comment){
                        if(err){
                            console.log(err);
                        } else {
                            post.comments.push(comment);
                            post.save();
                            console.log("Created a new comment");
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;