BattleOfDebilism = BattleOfDebilism || {};

BattleOfDebilism.messages = {
  position: function position(playerId, position) {
    return JSON.stringify({
      type: 'position',
      playerId: playerId,
      x: position.x,
      y: position.y
    });
  },
  fire: function fire(playerId, pointer) {
    return JSON.stringify({
      type: 'fire',
      playerId: playerId,
      pointer: {
        worldX: pointer.worldX,
        worldY: pointer.worldY
      }
    });
  }
};