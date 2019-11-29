var mongoose = require('mongoose');
mongoose.set('debug',true);
mongoose.connect('mongodb://localhost/todoApi', {useUnifiedTopology: true, useNewUrlParser: true});

mongoose.Promise = Promise; // so that we can use promise

module.exports.Todo = require("./todo");