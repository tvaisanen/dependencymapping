const Tag = require('../../models').Tag;

function tagDeleteById(req,res) {
    console.log("DELETE TAG")

    const query = {_id: req.params.id};
    console.log(query)

    Tag.deleteOne(query)
        .then(msg => {
            console.log(msg);
             if (msg.deletedCount === 0){
                res.status(404).json();
            } else {
                res.status(204).json();
            }
        })
        .catch(err => res.status(400).json(err))
}

module.exports = tagDeleteById;