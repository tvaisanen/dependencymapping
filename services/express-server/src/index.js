const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const testHandlers = require('./utils/testHandlers');
const initDatabaseConnection = require('./database');
const { registerRoutes } = require('./routers/');

let app = express();

if (process.env.NODE_ENV === "PRODUCTION"){
    const compression = require('compression');
    const helmet = require('helmet');

    app.use(compression);
    app.use(helmet);
}

// register middleware
app.use(cors());
app.use(bodyParser.json());

// init db connection
initDatabaseConnection();

// register resource routes
registerRoutes(app);

// misc routes
app.use('/coverage', express.static(__dirname + '/../coverage/'));
app.use('/open-api', express.static(__dirname + '/open-api/'));
app.use('/test', express.static(__dirname + 'src/pages'));
app.use(testHandlers.testRoutes);
app.use('/', express.static(__dirname + '/templates/'));

// 404
app.get('*', (req, res) => {
    res.status(404).send("resource not found")
});

// start the server
app.listen(3000, ()=> {
    console.log(
        `Dependency Mapping :: env: ${process.env.NODE_ENV}`
    );
});

module.exports = app;




