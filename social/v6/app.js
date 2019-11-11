const express           = require("express"),
      app               = express(),
      bodyParser        = require("body-parser"),
      mongoose          = require("mongoose"),
      passport          = require("passport"),
      LocalStrategy     = require("passport-local"),
      Post              = require("./models/post"),
      Comment           = require("./models/comment"),
      User              = require("./models/user"),
      seedDB            = require("./seeds");


mongoose.connect('mongodb://localhost/social', {useUnifiedTopology: true, useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.set("view engine","ejs");

//all posts will remove form this
seedDB();

// var posts = [
//     {name: "Ashi",image: "https://i.pinimg.com/236x/63/d2/4b/63d24b8198b2a949faf73b7886886d15.jpg"},
//     {name: "Archi",image: "https://i.pinimg.com/236x/dc/9f/25/dc9f251d735fac3d8a8497773a30a1ba.jpg"},
//     {name: "Noni",image: "https://i.pinimg.com/236x/bd/2f/fa/bd2ffaa2743f756e7177795d16da9a8b.jpg"}
// ]


app.get("/",function(req,res){
    res.render("landing");
});

// INDEX- show all posts of socialMedia
app.get("/posts",function(req,res){ //campgrounds
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
app.post("/posts",function(req,res){
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
app.get("/posts/new",function(req,res){
    res.render("posts/new");
});

//SHOW - shows more info about one post
app.get("/posts/:id",function(req,res){
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


// ============================
//  COMMENTS ROUTES
// ============================

app.get("/posts/:id/comments/new",function(req, res){
    //find post by id
    Post.findById(req.params.id,function(err,post){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new",{post:post});
        }
    });
});

app.post("/posts/:id/comments",function(req,res){
    //lookup posts usign id
    Post.findById(req.params.id,function(err,post){
        if(err){
            console.log(err);
            res.redirect("/posts");
        } else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                } else {
                    post.comments.push(comment);
                    post.save();
                    res.redirect("/posts/"+post._id);
                }
            });
        }
    });
    //create new comment
    //connect new comment to post
    //redirect post show page
});

app.listen(3000,function(){
    console.log("Social app started at port 3000!");
});