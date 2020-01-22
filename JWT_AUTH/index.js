const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

// IMPORT ROUTES
const authRoute = require("./routes/auth");

dotenv.config();

// Connect to DB
mongoose.connect(
	process.env.DB_CONNECT,
	{ useUnifiedTopology: true, useNewUrlParser: true },
	() => {
		console.log("database connected");
	}
);

// Middleware
app.use(express.json());

// Route middleware
app.use("/api/user", authRoute);

app.listen(3000, () => {
	console.log("server is running");
});
