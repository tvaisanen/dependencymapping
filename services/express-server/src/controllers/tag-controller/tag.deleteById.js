const Tag = require('../../models').Tag;

function tagDeleteById(req,res) {
    const query = {name: req.params.id};
    Tag.remove(query)
        .then(msg => {
            console.log(msg);
            res.status(204).json();
        })
        .catch(err => res.status(400).json(err))
}

module.exports = tagDeleteById;