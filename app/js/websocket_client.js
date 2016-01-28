var BattleOfDebilism = BattleOfDebilism || {};

BattleOfDebilism.initWebSocketClient = function () {
  if (!WebSocket) {
    return alert('Your web browser does not support websockets. Please stop being a hipster and download a modern browser');
  }
  var ws = new WebSocket("ws://localhost:8080");

  ws.onmessage = function (event) {
    var message = JSON.parse(event.data);
    var messageHandler = BattleOfDebilism.messageHandlers[message.type];
    messageHandler(message);
  };

  BattleOfDebilism.websocket = ws;
};

