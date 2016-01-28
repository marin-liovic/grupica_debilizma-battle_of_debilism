var BattleOfDebilism = BattleOfDebilism || {};

BattleOfDebilism.messageHandlers = {
  login: function (message) {
    BattleOfDebilism.player = BattleOfDebilism.utils.createPlayer(message.playerId, BattleOfDebilism.playersGroup);
  },
  newPlayer: function (message) {
    BattleOfDebilism.enemies.push(BattleOfDebilism.utils.createPlayer(message.playerId, BattleOfDebilism.playersGroup, message.position));
  },
  deletePlayer: function (message) {
    var player =_.remove(BattleOfDebilism.enemies, {id: message.playerId})[0];
    player.sprite.kill();
  },
  position: function (message) {
    var enemy =_.find(BattleOfDebilism.enemies, {id: message.playerId});
    enemy.sprite.position.x = message.x;
    enemy.sprite.position.y = message.y;
  },
  fire: function (message) {
    BattleOfDebilism.utils.enemyFire(message.playerId, message.pointer);
  }
};