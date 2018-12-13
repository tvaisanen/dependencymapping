const express = require('express');
const Tag = require('../models').Tag;
const tagRouter = express.Router();

tagRouter.get('(/:id)?', (req, res) => {

    if (req.params.id) {
        Tag.findOne({name: req.params.id})
            .then(tag => {
                if (tag == null) {
                    console.log("Tag does not exist.");
                    res.status(404).json("Resource does not exist.")
                } else {
                    console.log(tag);
                    res.status(200).json(tag);
                }
            }).catch(err => res.status(400).json(err));

    } else {
        Tag.find()
            .then(tags => res.status(200).json(tags))
            .catch(err => res.status(400).json(err));
    }
});

tagRouter.post('(/:id)?', (req, res) => {
    const query = {name: req.param.id};
    const tag = new Tag({...req.body});


    if (!tag.name) {
        res.status(400).json({error: "name is required field"})
    } else {
        Tag.findOne({name: tag.name})
            .then(existing => {
                if (existing) {
                    res.status(409).json({
                        error: `Asset ${existing.name} already exists.`,
                        pathToExisting: `/tag/${existing.name}`
                    });
                } else {
                    console.log('here')
                    tag.save().then(saved => {
                        console.log(`saved: ${saved.name}`);
                        res.status(201).json(saved);
                    }).catch(err => {
                        console.log(err);
                    })
                }
            })
            .catch(err => {
                console.log(`err: ${err}`)
            });
    }

});

tagRouter.put('(/:id)?', (req, res) => {
    const query = {name: req.params.id};
    console.log(query);

    console.log(req.body)

    Tag.update(query, req.body)
        .then(ok => {
            Tag.findOne(query)
                .then(tag => res.status(200).json(tag))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).send(err));
});

tagRouter.delete('/:id', (req, res) => {
    const query = {name: req.params.id};
    Tag.remove(query)
        .then(msg => {
            console.log(msg);
            res.status(204).json();
        })
        .catch(err => res.status(400).json(err))
});


module.exports = tagRouter;