const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const testHandlers = require('./utils/testHandlers');
const initDatabaseConnection = require('./database');
const { registerRoutes } = require('./routers/');
//const { registerWs } = require('./socket');


let app = express();
//const expressWs = require('express-ws')(app);
//const expressWs = registerWs(app);

/*if (process.env.NODE_ENV === "PRODUCTION"){
    const compression = require('compression');
    const helmet = require('helmet');

    app.use(compression);
    app.use(helmet);
}*/

// register middleware

app.use(bodyParser.json());
app.use(cors());

/* WEBSOCKET */
/*
app.ws('/', function(ws, req) {

    ws.on('connection', function(ws, req, next){
        console.log('connected');
        ws.send('hello there')
    });

    ws.on('message', function(msg){
        console.log(msg);
        ws.send('back at u')
    });
});
*/

/*
app.use('/broadcast', (req,res) => {
   expressWs.getWss('/').clients.forEach(client => {
       client.send('broadcast message')
   });
   res.send(200);
});
*/

/*************/

// init db connection
initDatabaseConnection();

// register resource routes
registerRoutes(app);

// misc routes
app.use('/coverage', express.static(__dirname + '/../coverage/'));
app.use('/open-api', express.static(__dirname + '/open-api/'));

if (process.env.NODE_ENV !== "PRODUCTION") {
    // don't allow these in production
    app.use('/test', express.static(__dirname + 'src/pages'));
    app.use(testHandlers.testRoutes);
    app.use('/', express.static(__dirname + '/templates/'));
}

// 404
app.get('*', (req, res) => {
    res.status(404).send("Resource not found!")
});

// start the server
app.listen(3000, ()=> {
    console.log(
        `Dependency Mapping :: env: ${process.env.NODE_ENV}`
    );

    console.log(`public url :: env: ${process.env.PUBLIC_URL}`)
});

module.exports = app;




