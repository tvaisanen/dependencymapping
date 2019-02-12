const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs')


const assetRouter = require('./routers/asset.router');
const mappingRouter = require('./routers/mapping.router');
const tagRouter = require('./routers/tag.router');
const connectionRouter = require('./routers/connection.router');
const testHandlers = require('./utils/testHandlers');
const initDatabaseConnection = require('./database');

let app = express();

if (process.env.NODE_ENV === "PRODUCTION"){
    const compression = require('compression');
    const helmet = require('helmet');

    app.use(compression);
    app.use(helmet);
}

initDatabaseConnection();


app.use(cors());
app.use(bodyParser.json());

app.use('/coverage', express.static(__dirname + '/../coverage/'));
app.use('/open-api', express.static(__dirname + '/open-api/'));

//app.use('/open-api', (req,res)=> {
//
//    res.status(200).send(`${__dirname}/open-api/`)
//});

app.use('/test', express.static(__dirname + 'src/pages'));

app.use('/asset', assetRouter);
app.use('/mapping', mappingRouter);
app.use('/tag', tagRouter);
app.use('/connection', connectionRouter);
app.use(testHandlers.testRoutes);

app.get('/', express.static(__dirname + '/templates/'));
app.get('/404', express.static(__dirname + '/templates/404.html'));

app.get('*', (req, res) => {
    res.status(404).send("resource not found")
});


//! todo: make this work
app.use(function(req, res, next) {
  res.set({'Content-Type': 'application/hal+json'});
  next();
});

app.listen(3000, ()=> {
    console.log(
        `Dependency Mapping :: env: ${process.env.NODE_ENV}`
    );
});

module.exports = app;




