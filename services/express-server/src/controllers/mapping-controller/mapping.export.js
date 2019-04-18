const {Mapping, Asset, Tag} = require('../../models');
const {API_PATH} = require('../../utils/configs');


function mappingExport(req, res) {
    Promise.all([
        Mapping.find(),
        Asset.find(),
    ]).then(([mappings, assets]) => {

        const mappingsCompiled = mappings
            .map(q => {
                const mapping = q._doc;
                return {
                    _id: mapping._id,
                    name: mapping.name,
                    description: mapping.description,
                    href: `${API_PATH}/mapping/export/${mapping._id}`,
                    tags: mapping.tags,
                    resources: assets
                        .filter(a => mapping.assets.indexOf(a.name) !== -1)
                        .map(a => ({
                            _id: a._id,
                            href: `${API_PATH}/asset/${mapping._id}`,
                            description: a.description,
                            name: a.name,
                            tags: a.tags,
                            connectedTo: assets
                                .filter(t => a.connected_to.indexOf(t.name) !== -1)
                                .map(t => t._id)
                        })),
                }
            });


        res.status(200).json(mappingsCompiled);

    }).catch(err => {
        console.log(err)
        res.send(err)
    });

}

module.exports = mappingExport;