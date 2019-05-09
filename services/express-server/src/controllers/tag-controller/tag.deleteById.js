const Tag = require('../../models').Tag;

function tagDeleteById(req,res) {
    const query = {_id: req.params.id};

    Tag.deleteOne(query)
        .then(msg => {
            if (msg.deletedCount === 0){
                res.status(404).json();
            } else {
                res.status(204).json();
            }
        }).catch(err => {
        if (err.name === 'CastError') {
            res.status(404).json("Not Found")
        }
        res.status(500).json("Internal Server Error")
    });
}

module.exports = tagDeleteById;