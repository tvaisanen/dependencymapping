const Mapping = require('../../models').Mapping;

function mappingDeleteById (req, res) {
    Mapping.remove({name: req.params.id})
        .then(msg => {
            if (msg.ok === 1) {
                res.status(204).json();
            }
        })
        .catch(err => {
            res.status(400).json({"error": err});
        });
};

module.exports = mappingDeleteById;