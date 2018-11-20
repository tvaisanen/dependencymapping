const express = require('express');
const Asset = require('../models').Asset;
const assetRouter = express.Router();


assetRouter.get('(/:id)?', (req, res) => {
    if (req.params.id) {
        Asset.findOne({name: req.params.id})
            .then(asset => {

                console.log(asset)
                if (!asset){
                   res.status(404).json("Resource does not exist.")
                } else {
                console.log(asset);
                res.status(200).json(asset);
                }

            }).catch(err => res.status(400).json(err));
    } else {
        Asset.find()
            .then(assets => res.send(assets))
            .catch(err => res.send(err));
    }

});

assetRouter.post('(/:id)?', (req, res) => {
    console.log(`post: ${req.params.id}`);
    const query = {name: req.param.id};
    const asset = new Asset({...req.body});
    asset.save().then(saved => {
        console.log(`saved: ${saved.name}`);
        res.status(201).json(saved);
    }).catch(err => {
        console.log(err);
    })
});

assetRouter.put('(/:id)?', (req, res) => {
    const query = {name: req.params.id};
    console.log(query);
    const updatedAsset = req.body;
    Asset.update(query, req.body)
        .then(ok => res.status(204).json("Resource updated succesfully."))
        .catch(err => res.status(400).send(err));
});


module.exports = assetRouter;
