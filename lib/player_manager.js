'use strict';

var _ = require('lodash');
var players = [];
var availableIds = ['player1', 'player2', 'player3', 'player4'];

module.exports = function () {
  return {
    createPlayer: function createPlayer(socket) {
      var id = availableIds.pop();
      players.push({id: id, socket: socket});
      return id;
    },
    getPlayer: function getPlayer(id) {
      return _.find(players, {id: id});
    },
    deletePlayer: function deletePlayer(id) {
      availableIds.push(id);
      _.remove(players, {id: id});
    },
    getOtherPlayers: function getOtherPlayers(id) {
      return _.filter(players, function (player) {
        return player.id !== id;
      });
    }
  };
};