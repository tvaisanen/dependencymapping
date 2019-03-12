const Asset = require('../../models').Asset;

function assetDelete(req, res){
    console.log(`assetDeleteById:: ${req.params.id}`)
    console.log(req.params)
    const query = {_id: req.params.id};
    Asset.deleteOne(query)
        .then(ok => {
            res.status(204).json();
        })
        .catch(err => res.status(400).json(err))
}

module.exports = assetDelete;
