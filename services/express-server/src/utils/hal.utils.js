const fs = require('fs');

// this is handled via docker secrets
// and meant not to be included in the repo
const PUBLIC_URL_FILE = '/run/secrets/public-api-path';

let API_PATH = "<FIXME-WITH-ENV-VARS>";

try {
    API_PATH = fs.readFileSync(PUBLIC_URL_FILE)
        .toString()
        .replace('\n', '');
    console.log(API_PATH)
} catch (err) {
    console.warn('public url secret not found?')
    console.log(err)
}

function serializeAsset(host, resource) {
    console.log(`serialize: ${resource.name}`)
    try {
        return {
            _links: {
                self: {
                    // todo: use constants
                    href: `${API_PATH}/asset/${resource._id}`
                }
            },
            _embedded: {
                connected_to: [
                    ...resource._doc.connected_to.map(asset => ({
                        name: asset,
                        href: `${API_PATH}/asset/?name=${encodeURI(asset)}`
                    }))
                ],
                tags: [
                    ...resource._doc.tags.map(tag => ({
                        name: tag,
                        href: `${API_PATH}/tag/?name=${encodeURI(tag)}`
                    }))
                ],
                group: {
                    name: resource._doc.group,
                    href: resource._doc.group !== "" ?
                        `${API_PATH}/asset/?name=${encodeURI(resource._doc.group)}`
                        : "",
                }
            },
            ...resource._doc
        }

    } catch (err) {
        console.error(err)
    }
}

function serializeAssetWithPointers(host, asset) {
    console.log(`serialize: ${asset.name}`)
    try {
        return {
            _id: asset._id,
            name: asset.name,
            description: asset.description,
            nodeColor: asset.nodeColor,
            nodeShape: asset.nodeShape,
            _links: {
                self: {
                    // todo: use constants
                    href: `${API_PATH}/asset/${asset._id}`
                }
            },
            _embedded: {
                connected_to: [
                    ...asset.connected_to.map(target => ({
                        _id: target._id,
                        name: target.name,
                        href: `${API_PATH}/asset/${target._id}`
                    }))
                ],
                tags: [
                    ...asset.tags.map(tag => ({
                        _id: tag._id,
                        name: tag.name,
                        href: `${API_PATH}/tag/${tag._id}`
                    }))
                ],
                group: {
                    _id: asset.group._id,
                    name: asset.group.name,
                    href: asset.group !== "" ?
                        `${API_PATH}/asset/${asset.group._id}`
                        : "",
                }
            },
        }

    } catch (err) {
        console.error(err)
    }
}

function serializeTag(host, resource) {
    return {
        _links: {
            self: {
                href: `${API_PATH}/tag/${resource._id}`
            }
        },
        ...resource._doc
    }
}

function serializeConnection(host, resource) {
    return {
        _links: {
            self: {
                href: `${API_PATH}/tag/${resource._id}`
            }
        },
        _embedded: {
            target: {
                name: resource.target,
                href: `${API_PATH}/connection/${resource._doc.target}`
            },
            source: {
                name: resource.source,
                href: `${API_PATH}/connection/${resource._doc.source}`
            },
            tags: resource._doc.tags.map(tag => ({
                    name: tag,
                    href: `${API_PATH}/tag/?name=${encodeURI(tag)}`,
                })
            )
        },
        ...resource._doc
    }
}

function serializeMapping(host, resource) {
    try {
        return {
            _links: {
                self: {
                    // todo: use constants
                    href: `${API_PATH}/mapping/${resource._id}`
                }
            },
            _embedded: {
                assets: [
                    ...resource._doc.assets.map(asset => ({
                        name: asset,
                        href: `${API_PATH}/asset/?name=${encodeURI(asset)}`
                    }))
                ],
                tags: [
                    ...resource._doc.tags.map(tag => ({
                        name: tag,
                        href: `${API_PATH}/tag/?name=${encodeURI(tag)}`
                    }))
                ],
            },
            ...resource._doc
        }

    } catch (err) {
        console.error(err)
    }
}

function serializeMappingWithAssetIDs(host, mapping) {
    console.log(mapping)
    try {
        return {
            _links: {
                self: {
                    // todo: use constants
                    href: `${API_PATH}/mapping/${mapping._id}`
                }
            },
            _embedded: {
                assets: [
                    ...mapping.assets.map(asset => ({
                        name: asset.name,
                        _id: asset._id,
                        href: `${API_PATH}/asset/${asset._id}`
                    }))
                ],
                tags: [
                    ...mapping.tags.map(tag => ({
                        _id: tag._id,
                        name: tag.name,
                        href: `${API_PATH}/tag/${tag._id}`
                    }))
                ],
            },
            _id: mapping._id,
            name: mapping.name,
            description: mapping.description
        }

    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    serializeAsset,
    serializeAssetWithPointers,
    serializeConnection,
    serializeMapping,
    serializeMappingWithAssetIDs,
    serializeTag
};