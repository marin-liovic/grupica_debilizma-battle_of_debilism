var BattleOfDebilism = BattleOfDebilism || {};

BattleOfDebilism.messageHandlers = {
  login: function (message) {
    BattleOfDebilism.player = BattleOfDebilism.utils.createPlayer(message.playerId, BattleOfDebilism.playersGroup);
  },
  newPlayer: function (message) {
    BattleOfDebilism.enemies.push(BattleOfDebilism.utils.createPlayer(message.playerId, BattleOfDebilism.playersGroup, message.position));
  },
  position: function (message) {
    var enemy =_.find(BattleOfDebilism.enemies, {id: message.playerId});
    enemy.sprite.position.x = message.x;
    enemy.sprite.position.y = message.y;
  }
};