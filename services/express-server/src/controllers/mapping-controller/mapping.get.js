const Mapping = require('../../models').Mapping;
const hal = require('../../utils/hal.utils');

function mappingGet(req, res) {
    Mapping.find()
        .then(mappings => {
            const HALMappings = mappings
                .map(m => {
                    return hal.serializeMapping(req.headers.host, m)
                });
            res.status(200).json(HALMappings);
        }).catch(err => res.send(err));

}

module.exports = mappingGet;