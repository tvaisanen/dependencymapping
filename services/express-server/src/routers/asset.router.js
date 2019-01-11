const express = require('express');
const Asset = require('../models').Asset;
const assetRouter = express.Router();


assetRouter.get('(/:id)?', (req, res) => {
    if (req.params.id) {
        Asset.findOne({name: req.params.id})
            .then(asset => {

                console.log(asset)
                if (!asset) {
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
    const asset = new Asset(req.body);

    if (!asset.name) {
        res.status(400).json({error: "name is required field"})

    } else {

        Asset.findOne({name: asset.name})
            .then(existing => {
                if (existing) {
                    res.status(409).json({
                        error: `Asset ${existing.name} already exists.`,
                        pathToExisting: `/asset/${existing.name}`
                    });
                } else {
                    console.log('here')
                    asset.save().then(saved => {
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

assetRouter.put('(/:id)?', (req, res) => {

    const query = {name: req.params.id};
    console.log(query);

    Asset.update(query, req.body)
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


module.exports = assetRouter;
