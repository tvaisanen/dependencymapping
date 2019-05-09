const Connection = require('../../models').Connection;
const hal = require('../../utils/hal.utils');
const config = require('../../utils/configs');

function connectionPost(req, res) {

    const {source, target} = req.body;

    Connection.findOne({source: source, target: target})

        .then((connection) => {

            console.log("already exist?")
            console.log(connection)

            if (connection) {
                res.set('Location', `${config.API_PATH}/connection/?source=${source}&target=${target}`);
                res.status(409).json({msg: "Conflict"})

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
