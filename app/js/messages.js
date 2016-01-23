BattleOfDebilism = BattleOfDebilism || {};

BattleOfDebilism.messages = {
  position: function position(playerId, position) {
    return JSON.stringify({
      type: 'position',
      playerId: playerId,
      x: position.x,
      y: position.y
    });
  }
};