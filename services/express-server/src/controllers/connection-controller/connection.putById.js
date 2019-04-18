const Connection = require('../../models').Connection;
const hal = require('../../utils/hal.utils');

function connectionPut(req, res) {
    console.log(`connection.router.putByID(${req.params.id})`);
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

module.exports = connectionPut;
