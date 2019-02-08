const Mapping = require('../../models').Mapping;

function deleteById (req, res) {
    console.log("\nDELETE BY ID\n")
    Mapping.remove({name: req.params.id})
        .then(msg => {
            if (msg.ok === 1) {
                res.status(204).json();
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({"error": "error"});
        });
};

module.exports = deleteById;