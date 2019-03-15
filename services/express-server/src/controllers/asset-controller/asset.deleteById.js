const Asset = require('../../models').Asset;

function assetDelete(req, res){
    console.log(`assetDeleteById:: ${req.params.id}`)
    console.log(req.params)
    const query = {_id: req.params.id};
    Asset.findOneAndDelete(query)
        .then(asset => {

            // todo: move to the model
            asset.connected_to.forEach(target => {
                Connection.deleteMany({$or: [{source: asset.name}, {target: asset.name}]})
                    .then((ok) => console.log(ok))
                    .catch(err => console.log(err))
            });

            res.status(204).json();
        })
        .catch(err => res.status(400).json(err))
}

module.exports = assetDelete;
