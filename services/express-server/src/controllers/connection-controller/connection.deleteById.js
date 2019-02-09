const Connection = require('../../models').Connection;
const hal = require('../../utils/hal.utils');


function connectionDeleteById(req, res) {
    Connection.remove({_id:req.params.id})
        .then(ok => {
            res.status(204).json();
        })
        .catch(err => {
            res.status(500).json({error: "Server error."})
        })
}

module.exports = connectionDeleteById;