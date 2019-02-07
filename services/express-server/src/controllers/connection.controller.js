const Connection = require('../models').Connection;
const hal = require('../utils/hal.utils');

function get(req, res) {
    if (req.query.source || req.query.target) {
        console.log("connection");
        console.log(req.query);
        Connection.findOne(req.query)
            .then(tag => {
                if (tag == null) {
                    console.log("connection does not exist.");
                    res.status(404).json("Resource does not exist.")
                } else {
                    console.log(tag);
                    res.status(200).json(tag);
                }
            }).catch(err => res.status(400).json(err));

    } else {
        Connection.find()
            .then(connections => {
                const HALConnections = connections.map(c => hal.serializeConnection(req.headers.host, c));
                res.status(200).json(HALConnections)
            })
            .catch(err => res.status(400).json(err));
    }
};


function remove(req, res) {
    Connection.remove(req.query)
        .then(response => {
            console.log(response);
            console.log(req.query);
            res.status(200).json({msg: "removed"})
        })
        .catch(err => {
            res.status(500).json({msg: err.toString()})
        })
};

function put(req, res) {
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
}

function post(req, res){

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
};


module.exports = {
    get,
    delete: remove,
    post,
    put
};
