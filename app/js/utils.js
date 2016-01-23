var BattleOfDebilism = BattleOfDebilism || {};

BattleOfDebilism.utils = function utils() {
  function findPlayerTile(player) {
    var result;
    BattleOfDebilism.map.objects['playersLayer'].forEach(function (element){
      if(element.type === player) {
        element.y -= BattleOfDebilism.map.tileHeight*5;
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
      var sprite = createSprite(position ? position : findPlayerTile(id), group, 'stipenis');
      BattleOfDebilism.game.physics.arcade.enable(sprite);
      sprite.body.bounce.y = 0.2;
      sprite.body.gravity.y = 500;
      sprite.body.collideWorldBounds = true;
      sprite.animations.add('left', [1, 2], 10, true);
      sprite.animations.add('right', [3, 4], 10, true);
      return  {
        id: id,
        sprite: sprite
      };
    },
    updatePlayer: function updatePlayer(player, cursors) {
      if (player) {
        var sprite = player.sprite;
        sprite.body.velocity.x = 0;
        if (cursors.left.isDown) {
          sprite.body.velocity.x = -150;
          sprite.animations.play('left');
        } else if (cursors.right.isDown) {
          sprite.body.velocity.x = 150;
          sprite.animations.play('right');
        } else {
          sprite.animations.stop();
          sprite.frame = 0;
        }
        if (cursors.up.isDown) {
          sprite.body.velocity.y = -250;
        }
        BattleOfDebilism.websocket.send(BattleOfDebilism.messages.position(player.id, sprite.position));
      }
    }
  };
}();
