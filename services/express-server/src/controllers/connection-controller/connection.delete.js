const Connection = require('../../models').Connection;
const hal = require('../../utils/hal.utils');


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
}

module.exports = remove;
