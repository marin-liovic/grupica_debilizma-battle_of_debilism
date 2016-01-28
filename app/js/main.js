var BattleOfDebilism = BattleOfDebilism || {};

(function () {
  BattleOfDebilism.game = new Phaser.Game(1280, 800, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render});
  var game = BattleOfDebilism.game;
  var wallLayer;
  var playersGroup;
  var text;
  var wasd;
  var reloadKey;
  var bulletsGroup;

  function preload() {
    game.load.tilemap('map', 'assets/tilemaps/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tilesetImage', 'assets/images/tileset.png');
    game.load.image('background', 'assets/images/background.jpg');
    game.load.image('bullet', 'assets/images/bullet.png');
    game.load.spritesheet('stipenis', 'assets/images/stipenis_spritesheet.png', 32, 67);
  }

  function create() {
    var map;
    game.add.sprite(32, 32, 'background');
    BattleOfDebilism.map = game.add.tilemap('map');
    map = BattleOfDebilism.map;
    map.addTilesetImage('tileset', 'tilesetImage');
    wallLayer = map.createLayer('wallLayer');
    map.setCollisionBetween(1, 100000, true, 'wallLayer');
    wallLayer.resizeWorld();
    game.physics.startSystem(Phaser.Physics.ARCADE);
    text = game.add.text(0, 0, 'Magazine: ' + BattleOfDebilism.utils.getMagazineSize(), {
      font: "30px Arial",
      fill: "#ffffff",
      align: "center"
    });

    //player
    BattleOfDebilism.playersGroup = game.add.group();
    playersGroup = BattleOfDebilism.playersGroup;
    playersGroup.enableBody = true;

    //bullets
    BattleOfDebilism.bulletsGroup = game.add.group();
    bulletsGroup = BattleOfDebilism.bulletsGroup;
    bulletsGroup.enableBody = true;
    bulletsGroup.physicsBodyType = Phaser.Physics.ARCADE;
    bulletsGroup.createMultiple(20, 'bullet');
    bulletsGroup.setAll('checkWorldBounds', true);
    bulletsGroup.setAll('outOfBoundsKill', true);

    //keys
    wasd = { up: game.input.keyboard.addKey(Phaser.Keyboard.W),
      left: game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: game.input.keyboard.addKey(Phaser.Keyboard.D)
    };
    reloadKey = game.input.keyboard.addKey(Phaser.Keyboard.R);

    BattleOfDebilism.initWebSocketClient();
    BattleOfDebilism.enemies = [];
  }

  function update() {
    game.physics.arcade.collide(playersGroup, wallLayer);
    game.physics.arcade.collide(bulletsGroup, wallLayer, function (bullet) {
      bullet.kill();
    });
    game.physics.arcade.collide(bulletsGroup, playersGroup, function (bullet, playerSprite) {
      bullet.kill();
      BattleOfDebilism.utils.restartPlayer(playerSprite);
      if (playerSprite.playerId === BattleOfDebilism.player.id) {
        alert('Owned by: ' + bullet.playerId);
      }
    });
    BattleOfDebilism.utils.updatePlayer(wasd, reloadKey);
    if (game.input.activePointer.isDown) {
      BattleOfDebilism.utils.fire();
    }
  }

  function render() {
    text.setText('Magazine:' + BattleOfDebilism.utils.getMagazineSize());
  }
})();
