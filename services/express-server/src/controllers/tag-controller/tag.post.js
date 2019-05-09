const Tag = require('../../models').Tag;
const hal = require('../../utils/hal.utils');


function tagPost(req, res) {

    const tag = new Tag({...req.body});


    Tag.findOne({name: tag.name})
        .then(existing => {
            if (existing) {
                res.set('Location', `/tag/${existing.name}`);
                res.status(409).json('Conflict');
            } else {
                tag.save().then(saved => {
                    res
                        .status(201)
                        .json(hal.serializeTag(req.headers.host, saved));
                }).catch(err => {
                    res.status(400).json({[err.path]: err.message})
                })
            }
        }).catch(err => {
            if (err.name === 'CastError') {
                res.status(404).json("Not Found")
            }
            res.status(500).json("Internal Server Error")
        });
}

module.exports = tagPost;