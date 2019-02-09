const Connection = require('../../models').Connection;
const hal = require('../../utils/hal.utils');


function connectionPost(req, res) {

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


module.exports = connectionPost;
