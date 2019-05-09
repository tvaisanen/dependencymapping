const Connection = require('../../models').Connection;
const hal = require('../../utils/hal.utils');

function connectionPut(req, res) {
    console.log(`connection.router.putByID(${req.params.id})`);

    Connection.findOneAndUpdate({_id: req.params.id}, req.body)
        .then(updatedConnection => {

                res.status(200).json(
                    hal.serializeConnection(
                        req.headers.host,
                        updatedConnection
                    )
                )
            }
        ).catch(err => {
            if (err.name === 'CastError') {
            res.status(404).json("Not Found")
        }
            res.status(500).json("Internal Server Error")
        });
}

module.exports = connectionPut;
