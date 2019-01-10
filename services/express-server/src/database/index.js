const mongoose = require('mongoose');

// set defaults for testing if env variables not provided
const MONGO_PATH = process.env.MONGO_PATH || "mongo";
const MONGO_PORT = process.env.MONGO_PORT || "27017";
const DB_NAME = process.env.DB_NAME       || "test";


function initDatabaseConnection() {

    console.log("initDatabaseConnection");
    console.log(MONGO_PATH);
    console.log(MONGO_PORT);
    console.log(DB_NAME);

    mongoose.connect(`mongodb://${MONGO_PATH}:${MONGO_PORT}/${DB_NAME}`);

    mongoose.connection.on('connected', function () {
        console.log('Mongoose successful connection:');
        console.log(`running in: ${process.env.NODE_ENV} mode`)
        console.log(`using database: ${process.env.DB_NAME}`);
    });

    // If the connection throws an error
    mongoose.connection.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
    });
}

module.exports = initDatabaseConnection;


