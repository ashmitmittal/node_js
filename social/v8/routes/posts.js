var express = require("express");
var router  = express.Router();
var Post    = require("../models/post");

// INDEX- show all posts of socialMedia
router.get("/",function(req,res){ //campgrounds
    //get all posts from db
    Post.find({},function(err,allposts){
        if(err){
            console.log(err);
        } else {
         res.render("posts/index",{posts: allposts});
        }
    });
});

// CREATE - add new posts to DB
router.post("/",function(req,res){
    //get data from form and add to posts
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newPosts = {name:name, image: image,description: desc};
    //create a new post and save to db
    Post.create(newPosts,function(err,newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/posts");
        }
    });
    // posts.push(newPosts);
    //redirect
    // res.redirect("/posts");
});

//NEW - show form to create a new post
router.get("/new",function(req,res){
    res.render("posts/new");
});

//SHOW - shows more info about one post
router.get("/:id",function(req,res){
    //find the post with provided ID
    Post.findById(req.params.id).populate("comments").exec(function(err,foundpost){
        if(err){
            console.log(err);
        } else {
            //render show template with that post
            res.render("posts/show",{post:foundpost});
        }
    });
});


module.exports = router;