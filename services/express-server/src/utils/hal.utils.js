const { API_PATH } = require('./configs');

function serializeAsset(host, resource) {
    console.log(`serialize: ${resource.name}`)
    const _doc = resource._doc;
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
                        href: `${API_PATH}/asset/byName/${encodeURI(asset)}`
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
                        `${API_PATH}/asset/byName/${encodeURI(resource._doc.group)}`
                        : "",
                }
            },
            _id: _doc._id,
            description: _doc.description,
            name: _doc.name,
            nodeColor: _doc.nodeColor,
            nodeShape: _doc.nodeShape,
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
    console.log(resource)
    const { _doc } = resource;
    return {
        _links: {
            self: {
                href: `${API_PATH}/connection/${resource._id}`
            }
        },
        _embedded: {
            target: {
                name: resource.target,
                href: `${API_PATH}/asset/byName/${resource._doc.target}`
            },
            source: {
                name: resource.source,
                href: `${API_PATH}/asset/byName/${resource._doc.source}`
            },
            tags: resource._doc.tags.map(tag => ({
                    name: tag,
                    href: `${API_PATH}/tag/?name=${encodeURI(tag)}`,
                })
            )
        },
        _id: _doc._id,
        description: _doc.description,
        edgeLabel: _doc.edgeLabel,
        sourceArrow: _doc.sourceArrow,
        targetArrow: _doc.targetArrow
    }
}

function serializeMapping(host, resource) {
    const { _doc } = resource;
    console.log(resource)
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
            _id: _doc._id,
            name: _doc.name,
            description: _doc.description ? _doc.description : ""
        }

    } catch (err) {
        console.error(err)
    }
}

function serializeMappingWithAssetIDs(host, mapping) {
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