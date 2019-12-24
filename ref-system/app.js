const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const form = require("./models/form");

require("dotenv/config");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;

mongoose.connect(
	process.env.DB_CONNECTION,
	{ useUnifiedTopology: true, useNewUrlParser: true },
	() => {
		console.log("database connected");
	}
);

app.get("/", (req, res) => {
	res.send("hi there");
});
app.get("/form", (req, res) => {
	res.render("form");
});
app.post("/form", async (req, res) => {
	const Form = new form({
		name: req.body.name,
		number: req.body.number
	});
	const uniqid = req.body.uniqid;
	try {
		const saveform = await Form.save();
		console.log(saveform);
		if (uniqid) {
			form.findById(uniqid, (err, adv) => {
				if (!err) {
					res.send(adv.name);
				}
			});
		} else {
			res.json(saveform);
		}
	} catch (err) {
		res.json({ message: err });
	}
});

app.listen(PORT, () => {
	console.log(`Server stated at ${PORT}`);
});
