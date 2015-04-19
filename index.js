var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer(app).listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

app.use("/img", express.static(__dirname + '/img'));

io.on('connection', function(socket){
	var userName = 'Anonymous';
	socket.broadcast.emit('newUser', 'A new user has connected.');
	socket.on('chat message', function(msg, usr){
		io.emit('chat message', msg, usr);
	});
});

// http.listen(3000, function(){
// 	console.log('listening on *:3000');
// });