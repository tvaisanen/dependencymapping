const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const assetRouter = require('./routers/asset.router');
const mappingRouter = require('./routers/mapping.router');
const tagRouter = require('./routers/tag.router');
const connectionRouter = require('./routers/connection.router');

const testHandlers = require('./utils/testHandlers');

const initDatabaseConnection = require('./database');
initDatabaseConnection();

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/test', express.static('src/pages'));
app.use('/asset', assetRouter);
app.use('/mapping', mappingRouter);
app.use('/tag', tagRouter);
app.use('/connection', connectionRouter);
app.use(testHandlers.testRoutes);

app.get('*', (req, res) => {
    res.status(404).send('Resource not found.')
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




