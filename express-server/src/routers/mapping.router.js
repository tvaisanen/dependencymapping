const express = require('express');
const Mapping = require('../models').Mapping;
const mappingRouter = express.Router();


mappingRouter.get('(/:id)?', (req, res) => {
    if (req.params.id) {
        Mapping.findOne({name: req.params.id})
            .then(mapping => {
                if (!mapping){
                   res.status(404).json("Resource does not exist.")
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
    console.log(`post: ${req.params.id}`);
    const query = {name: req.param.id};
    const mapping = new Mapping({...req.body});
    mapping.save().then(saved => {
        console.log(`saved: ${saved.name}`);
        res.status(201).json(saved);
    }).catch(err => {
        console.log(err);
    })
});

mappingRouter.put('(/:id)?', (req, res) => {
    const query = {name: req.params.id};
    console.log(query);
    const updatedMapping = req.body;
    Mapping.update(query, req.body)
        .then(ok => res.status(204).json("Resource updated succesfully."))
        .catch(err => res.status(400).send(err));
});


module.exports = mappingRouter;