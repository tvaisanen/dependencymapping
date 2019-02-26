const {Asset, Connection} = require('../../models');

function assetDeleteByName(req, res){
    console.log(`Asset.router.assetDeleteByName(${req.params.name})`)
    const query = {name: req.params.name};
    Asset.findOneAndDelete(query)
        .then(asset => {
            asset.connected_to.forEach(target => {
                console.log(`find: ${target}`)
                Connection.deleteOne({$or: [{source: asset.name, target: target}, {target: asset.name}]})
                    .then((ok) => console.log(ok))
                    .catch(err => console.log(err))
            });

            res.status(204).json();
        })
        .catch(err => res.status(400).json(err))
}

module.exports = assetDeleteByName;
