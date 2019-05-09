const Mapping = require('../../models').Mapping;

function mappingDeleteById(req, res) {
    Mapping.remove({_id: req.params.id})
        .then(msg => {
            if (msg.ok === 1) {
                res.status(204).json();
            }
        }).catch(err => {
        if (err.name === 'CastError') {
            res.status(404).json("Not Found")
        }
        res.status(500).json("Internal Server Error")
    });
};

module.exports = mappingDeleteById;