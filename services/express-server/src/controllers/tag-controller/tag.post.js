const Tag = require('../../models').Tag;
const hal = require('../../utils/hal.utils');


function tagPost(req, res) {

    const tag = new Tag({...req.body});


    Tag.findOne({name: tag.name})
        .then(existing => {
            if (existing) {
                res.status(409).json({
                    error: `Asset ${existing.name} already exists.`,
                    pathToExisting: `/tag/${existing.name}`
                });
            } else {
                tag.save().then(saved => {
                    const serializedSaved = hal.serializeTag(req.headers.host, saved);
                    res.status(201).json(serializedSaved);
                }).catch(err => {
                    console.log(err);
                    res.status(400).json({[err.path]:err.message})
                })
            }
        })
        .catch(err => {
            console.log(`err: ${err}`)
            res.status(500).json({error: "Internal server error."})
        });
}

module.exports = tagPost;