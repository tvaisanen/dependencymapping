const Connection = require('../../models').Connection;
const hal = require('../../utils/hal.utils');

function connectionGetById(req, res) {
    console.log("getConnectionById");
    console.log(req.params.id);
    Connection.findOne({_id: req.params.id})
        .then(connection => {
            if (connection == null) {
                res.status(404).json("Not Found")
            } else {
                res.status(200).json(hal.serializeConnection("", connection));
            }
        }).catch(err => {
            if (err.name === 'CastError') {
                res.status(404).json("Not Found")
            }
            res.status(500).json('Internal Server Error')
        });

}

module.exports = connectionGetById;