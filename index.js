var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

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

http.listen(3000, function(){
	console.log('listening on *:3000');
});