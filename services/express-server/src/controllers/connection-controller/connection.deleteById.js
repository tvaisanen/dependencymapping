const Connection = require('../../models').Connection;
const hal = require('../../utils/hal.utils');


function connectionDeleteById(req, res) {
    console.log("connectionRouter.deleteById()")
    Connection.findOneAndDelete({_id:req.params.id})
        .then(msg => {
            console.log(msg)
            res.status(204).json("Succesfull Operation");
        })
        .catch(err => {
            if (err.name === 'CastError') {
            res.status(404).json("Not Found")
        }
            res.status(500).json("Internal Server Error")
        });
}

module.exports = connectionDeleteById;