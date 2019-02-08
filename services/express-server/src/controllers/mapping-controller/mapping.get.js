const Mapping = require('../../models').Mapping;

function get(req, res) {
    if (req.params.id) {
        Mapping.findOne({name: req.params.id})
            .then(mapping => {
                if (!mapping) {
                    res.status(404).json(err.RESOURCE_NOT_FOUND)
                } else {
                    res.status(200).json(mapping);
                }

            }).catch(err => res.status(400).json(err));
    } else {
        Mapping.find()
            .then(mappings => {
                const HALMappings = mappings.map(m => hal.serializeMapping(req.headers.host, m));
                res.status(200).json(HALMappings);
            }).catch(err => res.send(err));
    }

}

module.exports = get;