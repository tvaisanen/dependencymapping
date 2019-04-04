const { Mapping, Asset, Tag } = require('../../models');
const fs = require('fs');

// this is handled via docker secrets
// and meant not to be included in the repo
const PUBLIC_URL_FILE = '/run/secrets/public-api-path';

let API_PATH = "<FIXME-WITH-ENV-VARS>";

try {
   API_PATH = fs.readFileSync(PUBLIC_URL_FILE).toString();
   console.log(API_PATH)
} catch (err) {
    console.warn('public url secret not found?')
    console.log(err)
}

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
                    href: `${API_PATH}/asset/${mapping._id}`,
                    tags: mapping.tags,
                    resources: assets
                        .filter(a => mapping.assets.indexOf(a.name) !== -1)
                        .map(a => a._id),
                }
            });

        res.status(200).json(mappingsCompiled);

    }).catch(err => {
        console.log(err)
        res.send(err)
    });

}

module.exports = mappingExport;