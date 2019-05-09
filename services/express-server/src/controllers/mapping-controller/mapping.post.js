const Mapping = require('../../models').Mapping;
const hal = require('../../utils/hal.utils');

function mappingPost(req, res) {

    const mapping = new Mapping(req.body);
    const query = {name: mapping.name};

    Mapping.findOne(query)

        .then(existing => {

            if (existing) {
                res.status(400).json({
                    error: "point to existing?",
                    pathToExisting: `/mapping/${existing.name}`
                });
            } else {
                mapping.save().then(saved => {
                    res.status(201)
                        .json(hal
                            .serializeMapping(req.headers.host, saved));
                }).catch(err => {
                    console.log(err);
                })
            }
        })
        .catch(err => {
            console.log(`err: ${err}`)
        });
}

module.exports = mappingPost;