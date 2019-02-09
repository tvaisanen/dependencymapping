const Tag = require('../../models').Tag;
const hal = require('../../utils/hal.utils');

function getById(req, res) {
    Tag.findOne({_id: req.params.id})
        .then(tag => {

            if (tag == null) {
                // console.log("Tag does not exist.");
                res.status(404).json("Resource does not exist.")
            } else {
                // console.log(tag);
                const serializedTag = hal.serializeTag(req.headers.host, tag);
                res.status(200).json(serializedTag);
            }
        }).catch(err => res.status(400).json(err));
}

module.exports = getById;
