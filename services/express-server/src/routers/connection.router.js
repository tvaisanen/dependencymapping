const express = require('express');
const Connection = require('../models').Connection;
const connectionRouter = express.Router();
const hal = require('../utils/hal.utils');
const Router = require('express').Router;
const ConnectionController = require('../controllers/connection.controller');


connectionRouter.get('(/:id)?', (req,res) => ConnectionController.get(req,res));


connectionRouter.delete('(/:id)?', (req, res) => {
    Connection.remove(req.query)
        .then(response => {
            console.log(response);
            console.log(req.query);
            res.status(200).json({msg: "removed"})
        })
        .catch(err => {
            res.status(500).json({msg: err.toString()})
        })
});

connectionRouter.put('(/:id)?', (req, res) => {
    console.log("update");
    console.log(req.body)
    const query = {
        source: req.body.source,
        target: req.body.target
    }
    Connection.update(query, req.body)
        .then(ok => {

            Connection.findOne(query)

                .then(updatedConnection => {

                        res.status(200).json(
                            hal.serializeConnection(
                                req.headers.host,
                                updatedConnection
                            )
                        )
                    }
                ).catch(err => {

                console.log(err);
                res.status(500).json({error: err})
            });
        })
        .catch(err => {
            res.status(500).json({msg: err.toString()})
        });
});

connectionRouter.post('(/:id)?', (req, res) => {

    const {source, target} = req.body;

    Connection.findOne({source: source, target: target})

        .then((connection) => {

            console.log("already exist?")
            console.log(connection)

            if (connection) {
                res.status(409).json({msg: "already exists"})

            } else {
                const newConnection = new Connection(req.body);
                newConnection.save()
                    .then(saved => {
                        const halConnection = hal.serializeConnection(req.headers.host, saved)
                        res.status(201).json(halConnection)
                    }).catch(err => res.status(500).json(err))
            }

        }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


module.exports = connectionRouter;