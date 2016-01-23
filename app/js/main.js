var BattleOfDebilism = BattleOfDebilism || {};

(function () {
  BattleOfDebilism.game = new Phaser.Game(1280, 800, Phaser.AUTO, '', {preload: preload, create: create, update: update});
  var game = BattleOfDebilism.game;
  var wallLayer;
  var playersGroup;
  var cursors;

  function preload() {
    game.load.tilemap('map', 'assets/tilemaps/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tilesetImage', 'assets/images/tileset.png');
    game.load.image('background', 'assets/images/background.jpg');
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
    BattleOfDebilism.playersGroup = game.add.group();
    playersGroup = BattleOfDebilism.playersGroup;
    playersGroup.enableBody = true;
    cursors = game.input.keyboard.createCursorKeys();
    BattleOfDebilism.initWebSocketClient();
    BattleOfDebilism.enemies = [];
  }

  function update() {
    game.physics.arcade.collide(playersGroup, wallLayer);
    BattleOfDebilism.utils.updatePlayer(BattleOfDebilism.player, cursors);
  }
})();
