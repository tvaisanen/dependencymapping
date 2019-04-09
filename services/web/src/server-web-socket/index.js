/**
console.group("%cSetting up WebSocket connection", "font-weight:bold;font-size:1.5em;");
console.log(document.location.host)
console.groupEnd();
*/

const HOST = document.location.host;
const WS_PATH = `ws://localhost:3000/`;

const socket = new WebSocket(WS_PATH);

export const initConnection = () => {

    socket.addEventListener('open', function (event) {
        socket.send('Hello Server!');
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log('socket message: ', event.data);
    });
};

