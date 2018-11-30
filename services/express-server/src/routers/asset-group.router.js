const express = require('express');
const AssetGroup = require('../models').AssetGroup;
const assetRouter = express.Router();


assetRouter.get('(/:id)?', (req, res) => {
    if (req.params.id) {
        AssetGroup.findOne({name: req.params.id})
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
        AssetGroup.find()
            .then(assets => res.send(assets))
            .catch(err => res.send(err));
    }

});
/*
assetRouter.post('(/:id)?', (req, res) => {
    console.log(`post: ${req.params.id}`);
    const query = {name: req.param.id};
    const asset = new Asset({
        name: req.body.name,
        description: req.body.description,
        connected_to: req.body.connected_to,
        tags: req.body.tags
    });

    if ( !asset.name ) {
        res.status(400).json({error: "name is required field"})
    } else {

    asset.save().then(saved => {
        console.log(`saved: ${saved.name}`);
        console.log(saved);
        res.status(201).json(saved);
    }).catch(err => {
        console.log(err);
    })
    }
});

assetRouter.put('(/:id)?', (req, res) => {
    const query = {name: req.params.id};
    console.log(query);
    Asset.update(query, {
         name: req.body.name,
        description: req.body.description,
        connected_to: req.body.connected_to,
        tags: req.body.tags
    })
        .then(ok => {
            console.log("HERE")
            console.log(ok);
            Asset.findOne(query)
                .then(asset => {
                    console.log(asset);
                    res.status(200).json(asset);
                })
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).send(err));
});


assetRouter.delete('/:id', (req, res) => {
    const query = {name: req.params.id};
    Asset.remove(query)
        .then(msg => {
            console.log(msg);
            res.status(204).json();
        })
        .catch(err => res.status(400).json(err))
});

*/
module.exports = assetRouter;

