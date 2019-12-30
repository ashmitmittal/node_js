const express = require("express");
const app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var Port = process.env.PORT || 3000;

users = [];
connections = [];

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

io.sockets.on("connection", socket => {
	connections.push(socket);
	console.log("Connected: %s sockets connected", connections.length);

	//DISCONNET
	socket.on("disconnect", data => {
		// if (!socket.username) return;
		users.splice(users.indexOf(socket.username), 1);
		updateUsernames();
		connections.splice(connections.indexOf(socket), 1);
		console.log("Disconnectted: %s sockets connected", connections.length);
	});
	//send message
	socket.on("send message", data => {
		// console.log(data);
		io.sockets.emit("new message", { msg: data, user: socket.username });
	});

	//new user
	socket.on("new user", (data, callback) => {
		callback(true);
		socket.username = data;
		users.push(socket.username);
		updateUsernames();
	});
	const updateUsernames = () => {
		io.sockets.emit("get users", users);
	};
});

server.listen(Port, () => {
	console.log("server running at 3000...");
});
