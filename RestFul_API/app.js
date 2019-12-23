const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

//Connect to DB
mongoose.connect(
	process.env.DB_CONNECTION,
	{ useUnifiedTopology: true, useNewUrlParser: true },
	() => {
		console.log("database connected");
	}
);

//Import routes
const postRoute = require("./routes/posts");
app.use("/posts", postRoute);

//ROUTES
app.get("/", (req, res) => {
	res.send("homeee");
});

app.listen(PORT, () => {
	console.log("server started at " + PORT);
});
