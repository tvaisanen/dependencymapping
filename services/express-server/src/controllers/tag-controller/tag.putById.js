const Tag = require('../../models').Tag;
const hal = require('../../utils/hal.utils');

function tagPutByName(req, res) {

    const query = {_id: req.params.id};

    Tag.update(query, req.body)
        .then(ok => {
            Tag.findOne(query)
                .then(tag => res.status(200).json(tag))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).send(err));
}

module.exports = tagPutByName;