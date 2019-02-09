const Tag = require('../../models').Tag;
const hal = require('../../utils/hal.utils');

function get(req,res) {
    Tag.find()
        .then(tags => {
            const serializedTags = tags.map(t => hal.serializeTag(req.headers.host, t));
            res.status(200).json(serializedTags)
        })
        .catch(err => res.status(400).json(err));
}

module.exports = get;