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
    var sprite = enemy.sprite;
    var lastX = enemy.sprite.position.x;
    var dx = Math.abs(lastX - message.x);
    if (dx < 0.5) { //almost no movement
      sprite.animations.stop();
      sprite.frame = 0;
    } else if (lastX > message.x) {
      sprite.animations.play('left');
    } else if (lastX < message.x) {
      sprite.animations.play('right');
    }
    enemy.sprite.position.x = message.x;
    enemy.sprite.position.y = message.y;
  },
  fire: function (message) {
    BattleOfDebilism.utils.enemyFire(message.playerId, message.pointer);
  }
};