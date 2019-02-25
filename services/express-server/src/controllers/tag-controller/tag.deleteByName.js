const Tag = require('../../models').Tag;

function tagDeleteByName(req,res) {
    console.log(`DELETE TAG :: ${req.params.name}`)
    const query = {name: req.params.name};
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

module.exports = tagDeleteByName;