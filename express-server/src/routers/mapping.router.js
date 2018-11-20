const express = require('express');
const Mapping = require('../models').Mapping;
const mappingRouter = express.Router();

const msg = require('../constants').messages;
const err = require('../constants').errors;


mappingRouter.get('(/:id)?', (req, res) => {
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
                res.status(200).send(mappings);
            }).catch(err => res.send(err));
    }

});

mappingRouter.post('(/:id)?', (req, res) => {

    //
    console.log(`post: ${req.params.id}`);

    if (!req.body.name) {
        res.status(400).json({
            error: "name is a required required field",
            debug: req.body
        })
    } else {

        const mapping = new Mapping({...req.body});

        const query = {name: mapping.name};

        console.log("check if this already exists!");
        console.log(query);

        Mapping.findOne(query)
            .then(existing => {

                if (existing) {

                    console.log("Mapping already exists.");
                    console.log(`found: ${mapping}`)
                    res.status(409).json({
                        error: "point to existing?",
                        pathToExisting: `/mapping/${existing.name}`
                    });
                } else {
                /**  Mapping does not exist yet */

                    mapping.save().then(saved => {
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

mappingRouter.put('(/:id)?', (req, res) => {
    const query = {name: req.params.id};
    console.log(query);
    const updatedMapping = req.body;
    Mapping.update(query, req.body)
        .then(ok => {
            res.status(200).json(msg.UPDATED_SUCCESSFULLY_200)
        })
        .catch(err => res.status(400).send(err));
});

mappingRouter.delete('/:id', (req, res) => {
    Mapping.remove({name: req.params.id})
        .then(msg => {
            if (msg.ok === 1) {

                //res.status(200).json(msg.DELETED_SUCCESFULLY_200)
                res.status(200).send({
                    msg:"Resource deleted successfully."
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({"error": "error"});
        });
});


module.exports = mappingRouter;