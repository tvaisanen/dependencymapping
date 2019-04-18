const Mapping = require('../../models').Mapping;
const hal = require('../../utils/hal.utils');

function mappingGetById(req, res) {

    Mapping.findOne({_id: req.params.id})
        .then(mapping => {
            if (!mapping) {
                res.status(404).json(err.RESOURCE_NOT_FOUND)
            } else {
                res.status(200).json(mapping);
            }

        }).catch(err => res.status(400).json(err));
}

module.exports = mappingGetById;