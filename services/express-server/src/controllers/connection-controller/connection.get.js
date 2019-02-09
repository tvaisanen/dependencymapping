const Connection = require('../../models').Connection;
const hal = require('../../utils/hal.utils');

function connectionGet(req, res) {
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
}

module.exports = connectionGet;