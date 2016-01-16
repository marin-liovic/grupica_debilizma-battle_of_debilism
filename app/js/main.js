(function () {

  var game = new Phaser.Game(1280, 800, Phaser.AUTO, '', {preload: preload, create: create, update: update});
  var map;
  var wallLayer;
  var players;
  var player;
  var cursors;

  function findPlayerTile(player) {
    var result;
    map.objects['playersLayer'].forEach(function (element){
      if(element.type === player) {
        element.y -= map.tileHeight*5;
        result = element;
      }
    });
    return result;
  }

  function createSpriteFromTile(tile, group, sprite) {
    return group.create(tile.x, tile.y, sprite);
  }

  function preload() {
    game.load.tilemap('map', 'assets/tilemaps/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tilesetImage', 'assets/images/tileset.png');
    game.load.image('background', 'assets/images/background.jpg');
    game.load.spritesheet('stipenis', 'assets/images/stipenis_spritesheet.png', 32, 67);
  }



  function create() {
    game.add.sprite(32, 32, 'background');
    map = game.add.tilemap('map');
    map.addTilesetImage('tileset', 'tilesetImage');
    wallLayer = map.createLayer('wallLayer');
    map.setCollisionBetween(1, 100000, true, 'wallLayer');
    wallLayer.resizeWorld();
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //create items
    players = game.add.group();
    players.enableBody = true;
    player = createSpriteFromTile(findPlayerTile('player1'), players, 'stipenis');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 500;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [1, 2], 10, true);
    player.animations.add('right', [3, 4], 10, true);
    cursors = game.input.keyboard.createCursorKeys();

  }

  function update() {
    game.physics.arcade.collide(player, wallLayer);
    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    } else {
        player.animations.stop();
        player.frame = 0;
    }
    if (cursors.up.isDown) {
      player.body.velocity.y = -250;
    }
  }
})();
