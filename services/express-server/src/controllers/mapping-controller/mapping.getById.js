const Mapping = require('../../models').Mapping;
const hal = require('../../utils/hal.utils');

function mappingGetById(req, res) {

    Mapping.findOne({_id: req.params.id})
        .then(mapping => {
            if (!mapping) {
                res.status(404).json(err.RESOURCE_NOT_FOUND)
            } else {
                res.status(200).json(hal.serializeMapping("", mapping));
            }

        }).catch(err => {
            if (err.name === 'CastError') {
                res.status(404).json("Not Found")
            }
            res.status(500).json('Internal Server Error')
        });
}

module.exports = mappingGetById;