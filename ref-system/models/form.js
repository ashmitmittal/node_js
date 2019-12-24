const mongoose = require("mongoose");

const FormSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	number: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model("form", FormSchema);
