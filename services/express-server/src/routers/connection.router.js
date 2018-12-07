const express = require('express');
const Connection = require('../models').Connection;
const connectionRouter = express.Router();

connectionRouter.get('(/:id)?', (req, res) => {
    if (req.query.source || req.query.target) {
        console.log("connection");
        console.log(req.query);
        Connection.findOne(req.query)
            .then(tag => {
                if (tag == null) {
                    console.log("Tag does not exist.");
                    res.status(404).json("Resource does not exist.")
                } else {
                    console.log(tag);
                    res.status(200).json(tag);
                }
            }).catch(err => res.status(400).json(err));

    } else {
        Connection.find()
            .then(tags => res.status(200).json(tags))
            .catch(err => res.status(400).json(err));
    }
});



module.exports = connectionRouter;