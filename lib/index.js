'use strict';

var server = require('http').createServer();
var WebSocketServer = require('ws').Server;
var webSocketServer = new WebSocketServer({ server: server });
var express = require('express');
var _ = require('lodash');
var app = express();
var PORT = 8080;
var playerManager = require('./player_manager')();
var messageHandler = require('./message_handler')();

app.use(express.static('app'));

webSocketServer.on('connection', function connection(socket) {
  var playerId = playerManager.createPlayer(socket);
  socket.send(JSON.stringify({type: 'login', playerId: playerId}));
  var otherPlayers = playerManager.getOtherPlayers(playerId);
  _.each(otherPlayers, function (player) {
    socket.send(JSON.stringify({type: 'newPlayer', playerId: player.id, position: player.position}));
    player.socket.send(JSON.stringify({type: 'newPlayer', playerId: playerId}));
  });

  socket.on('message', function incoming(message) {
    message = JSON.parse(message);
    messageHandler[message.type](message);
  });

  socket.on('close', function incoming(code, message) {
    playerManager.deletePlayer(playerId);
    _.each(playerManager.players, function (player) {
      player.socket.send(JSON.stringify({type: 'deletePlayer', playerId: playerId}));
    });
  });
});

server.on('request', app);
server.listen(PORT, function () {
  console.log('Grupica debilizma up and running!');
});