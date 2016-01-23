var BattleOfDebilism = BattleOfDebilism || {};

BattleOfDebilism.initWebSocketClient = function () {
  var ws = new WebSocket("ws://localhost:8080");

  ws.onopen = function() {
    console.log('connection opened');
  };

  ws.onmessage = function (event) {
    console.log('message received: ', event);
    var message = JSON.parse(event.data);
    var messageHandler = BattleOfDebilism.messageHandlers[message.type];
    messageHandler(message);
  };

  ws.onclose = function() {
    console.log('connection closed');
  };

  BattleOfDebilism.websocket = ws;
};

