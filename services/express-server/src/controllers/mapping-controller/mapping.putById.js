const Mapping = require('../../models').Mapping;
const hal = require('../../utils/hal.utils');

function mappingPut(req, res) {
    console.log(`mapping.router.putById(${req.params.id})`)
    const query = {_id: req.params.id};

    Mapping.findOneAndUpdate(query, req.body)
        .then(mapping => {
            if (!mapping) {
                res.status(404).json("Not Found");
            }
            res.status(200).json(hal.serializeMapping(req.headers.host, mapping));
        }).catch(err => {
        if (err.name === 'CastError') {
            res.status(404).json("Not Found")
        }
        res.status(500).json("Internal Server Error")
    });
}

module.exports = mappingPut;