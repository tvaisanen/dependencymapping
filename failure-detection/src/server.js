var WebSocketServer = require('ws').Server;
wss = new WebSocketServer({port: 3001});

console.log('Initializing failure-detection-service web socket server.');

wss.on('connection', function(ws){
    ws.on('message', function(message){
        console.log("received action: %s", JSON.stringify(message));
    })
});

