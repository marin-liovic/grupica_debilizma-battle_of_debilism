'use strict';

var _ = require('lodash');
var playerManager = require('./player_manager')();

module.exports = function() {
  return {
    position: function (message) {
      var player = playerManager.getPlayer(message.playerId);
      player.position = {
        x: message.x,
        y: message.y
      };
      var otherPlayers = playerManager.getOtherPlayers(message.playerId);
      _.each(otherPlayers, function (player) {
        player.socket.send(JSON.stringify(message));
      });
    },
    fire: function (message) {
      var otherPlayers = playerManager.getOtherPlayers(message.playerId);
      _.each(otherPlayers, function (player) {
        player.socket.send(JSON.stringify(message));
      });
    }
  }
};