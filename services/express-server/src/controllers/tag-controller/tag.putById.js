const Tag = require('../../models').Tag;
const hal = require('../../utils/hal.utils');

function tagPutById(req, res) {

    const query = {_id: req.params.id};

    Tag.findOneAndUpdate(query, req.body, {new: true})
        .then(tag => res.status(200).json(hal.serializeTag("", tag)))
        .catch(err => {
            if (err.name === 'CastError' || err.name === 'TypeError') {
                res.status(404).json("Not Found")
            }
            res.status(500).json("Internal Server Error")
        });
}

module.exports = tagPutById;