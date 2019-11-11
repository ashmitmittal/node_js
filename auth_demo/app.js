const   express                 = require("express"),
        mongoose                = require("mongoose"),
        passport                = require("passport"),
        bodyParser              = require("body-parser"),
        User                    = require("./models/user"),
        LocalStrategy           = require("passport-local"),
        passportLocalMongoose   = require("passport-local-mongoose")


mongoose.connect('mongodb://localhost/auth_demo', {useUnifiedTopology: true, useNewUrlParser: true});

const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret:"i am failure",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//==============================
//ROUTES
//==============================


app.get("/",function(req,res){
    res.render("home");
});

app.get("/secret",isLoggedIn,function(req,res){
    res.render("secret");
});

//AUTH ROUTES

//show signup form
app.get("/register",function(req,res){
    res.render("register");
});
//handling user signup
app.post("/register",function(req,res){
    req.body.username
    req.body.password
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/secret");
        });
    });
});

//login form
app.get("/login",function(req,res){
    res.render("login");
});

//handling user login
//middleware
app.post("/login",passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login"
}),function(req,res){
});

app.get("/logout",function(req,res){
    req.logOut();
    res.redirect("/");
});


//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } else{ 
        res.redirect("/login");
    }
}


app.listen(3000,function(){
    console.log("Server start at port 3000");
});