/*let expressWs;
let pingTimer;

const PING_INTERVAL = 10000; // 4 sec

function setAlivePing() {
    return setInterval(() => {
        expressWs.getWss('/').clients.forEach(client => {
            client.send('keep alive ping')
        });
    }, PING_INTERVAL);
}

module.exports = {
    registerWs: (app) => {
        expressWs = require('express-ws')(app);
        pingTimer = setAlivePing();
        return expressWs;
    },
    socketClients: () => expressWs.getWss('/'),
    broadcastToClients: (message) => {
        console.log("broadcast to clients")
        expressWs.getWss('/').clients.forEach(client => {
            client.send(message)
        })
    }
};

*/
