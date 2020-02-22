var express = require("express");
var app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.get("/", (req, res) => {
	res
		.cookie("name", "ashmit mittal", { expire: Date.now() + 36000 })
		.send("Cookies are set");
});
app.get("/show", (req, res) => {
	res.send(req.cookies);
});
app.get("/delete", (req, res) => {
	res.clearCookie("name").send("name cookie are deleted");
});

app.listen(3000, () => {
	console.log("server started at 3000");
});
