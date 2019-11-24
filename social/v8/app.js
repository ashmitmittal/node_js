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

//require routes
var commentRoutes = require("./routes/comments"),
    postsRoutes   = require("./routes/posts"),
    authRoutes    = require("./routes/index");

mongoose.connect('mongodb://localhost/social', {useUnifiedTopology: true, useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.set("view engine","ejs");

//all posts will remove form this
seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"i am losser",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){ //middleware that run for every single route
    res.locals.currentUser = req.user;
    next();
});


app.use(authRoutes);
app.use("/posts",postsRoutes);
app.use("/posts/:id/comments",commentRoutes);


app.listen(3000,function(){
    console.log("Social app started at port 3000!");
});