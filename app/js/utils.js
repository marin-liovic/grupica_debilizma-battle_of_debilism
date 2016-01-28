var BattleOfDebilism = BattleOfDebilism || {};
var FIRE_DELAY_MS = 200;
var RELOAD_TIMEOUT_MS = 2000;
var MAX_BULLETS_IN_MAGAZINE = 3;
var PLAYER_ID_TO_SPRITE = {
  player1: 'stipenis',
  player2: 'pope',
  player3: 'miso',
  player4: 'mod'
};
var nextFireTime = 0;
var bulletsInMagazine = MAX_BULLETS_IN_MAGAZINE;
var isReloading = false;

BattleOfDebilism.utils = function utils() {
  var PLAYER_TILE;
  function findPlayerTile(playerId) {
    var result;
    BattleOfDebilism.map.objects['playersLayer'].forEach(function (element){
      if(element.type === playerId) {
        element.y -= BattleOfDebilism.map.tileHeight*4;
        result = element;
      }
    });
    return result;
  }

  function createSprite(position, group, sprite) {
    return group.create(position.x, position.y, sprite);
  }

  return {
    createPlayer: function createPlayer(id, group, position) {
      PLAYER_TILE = findPlayerTile(id);
      var sprite = createSprite(position ? position : PLAYER_TILE, group, PLAYER_ID_TO_SPRITE[id]);
      BattleOfDebilism.game.physics.arcade.enable(sprite);
      sprite.body.bounce.y = 0.2;
      sprite.body.gravity.y = 500;
      sprite.body.collideWorldBounds = true;
      sprite.animations.add('left', [1, 2], 10, true);
      sprite.animations.add('right', [3, 4], 10, true);
      sprite.playerId = id;
      return  {
        id: id,
        sprite: sprite
      };
    },
    updatePlayer: function updatePlayer(movementKeys, reloadKey) {
      var player = BattleOfDebilism.player;
      if (player) {
        var sprite = player.sprite;
        sprite.body.velocity.x = 0;
        if (movementKeys.left.isDown) {
          sprite.body.velocity.x = -150;
          sprite.animations.play('left');
        } else if (movementKeys.right.isDown) {
          sprite.body.velocity.x = 150;
          sprite.animations.play('right');
        } else {
          sprite.animations.stop();
          sprite.frame = 0;
        }
        if (movementKeys.up.isDown) {
          sprite.body.velocity.y = -250;
        }
        BattleOfDebilism.websocket.send(BattleOfDebilism.messages.position(player.id, sprite.position));
        if (reloadKey && reloadKey.isDown) {
          BattleOfDebilism.utils.reload();
        }
      }
    },
    restartPlayer: function restartPlayer(playerSprite) {
      var playerTile = findPlayerTile(playerSprite.playerId);
      playerSprite.position.x = playerTile.x;
      playerSprite.position.y = playerTile.y;
    },
    fire: function fire() {
      var game = BattleOfDebilism.game;
      if (game.time.now > nextFireTime && BattleOfDebilism.bulletsGroup.countDead() > 0 && bulletsInMagazine > 0) {
        bulletsInMagazine--;
        nextFireTime = game.time.now + FIRE_DELAY_MS;
        var bullet = BattleOfDebilism.bulletsGroup.getFirstDead();
        bullet.reset(BattleOfDebilism.player.sprite.position.x + (BattleOfDebilism.player.sprite.width/2),
          BattleOfDebilism.player.sprite.position.y + (BattleOfDebilism.player.sprite.height/2));
        game.physics.arcade.moveToPointer(bullet, 300);
        BattleOfDebilism.websocket.send(BattleOfDebilism.messages.fire(BattleOfDebilism.player.id, game.input.activePointer));
      }
    },
    enemyFire: function enemyFire(playerId, pointer) {
      var game = BattleOfDebilism.game;
      var enemy =_.find(BattleOfDebilism.enemies, {id: playerId});
      if (BattleOfDebilism.bulletsGroup.countDead() > 0) {
        var bullet = BattleOfDebilism.bulletsGroup.getFirstDead();
        bullet.playerId = playerId;
        bullet.reset(enemy.sprite.position.x + (enemy.sprite.width/2),
          enemy.sprite.position.y + (enemy.sprite.height/2));
        game.physics.arcade.moveToPointer(bullet, 300, pointer);
      }
    },
    getMagazineSize: function getMagazineSize() {
      return bulletsInMagazine;
    },
    reload: function reload() {
      if (bulletsInMagazine === 0 && !isReloading) {
        isReloading = true;
        setTimeout(function () {
          bulletsInMagazine = MAX_BULLETS_IN_MAGAZINE;
          isReloading = false;
        }, RELOAD_TIMEOUT_MS);
      }
    }
  };
}();
