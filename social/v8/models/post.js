var mongoose = require("mongoose");
// SCHEMA SETUP
var postsSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

//compiling schema into model
module.exports = mongoose.model("Post",postsSchema);