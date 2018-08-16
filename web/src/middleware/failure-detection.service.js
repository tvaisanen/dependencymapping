/**
 * Middleware for Redux store which binds the dispatched
 * actions to web socket server analyzing state changes.
 * ( future feature).
 * To be used with failure detection service, which runs
 * separately from the django application.
 */


import * as types from '../actions/actionTypes';

let socket = null;

const sendAction = ({socket, action}) => socket.send(JSON.stringify(action));

const failureDetectionService = store => next => action => {
    try {
    if ( !socket ){
        socket = new WebSocket("ws://localhost:3001");
    }
    switch (socket.readyState) {
        case socket.OPEN:
            sendAction({socket, action});
            break;
        case socket.CLOSED:
            break;
        case socket.CLOSING:
            break;
        default:
            return next(action);
    }}
    catch (e){
        console.error(e);
        return next(action);
    }
};

export default failureDetectionService;