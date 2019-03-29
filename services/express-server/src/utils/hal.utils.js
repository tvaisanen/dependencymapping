const API_PATH = process.env.PUBLIC_URL
console.log(API_PATH)

function serializeAsset(host, resource) {
    console.log(`serialize: ${resource.name}`)
    try {
        return {
            _links: {
                self: {
                    // todo: use constants
                    href: `${host}/asset/${resource._id}`
                }
            },
            _embedded: {
                connected_to: [
                    ...resource._doc.connected_to.map(asset => ({
                        name: asset,
                        href: `${host}/asset/?name=${encodeURI(asset)}`
                    }))
                ],
                tags: [
                    ...resource._doc.tags.map(tag => ({
                        name: tag,
                        href: `${host}/tag/?name=${encodeURI(tag)}`
                    }))
                ],
                group: {
                    name: resource._doc.group,
                    href: resource._doc.group !== "" ?
                        `${host}/asset/?name=${encodeURI(resource._doc.group)}`
                        : "",
                }
            },
            ...resource._doc
        }

    } catch (err) {
        console.error(err)
    }
}

function serializeTag(host, resource) {
    return {
        _links: {
            self: {
                href: `${host}/tag/${resource._id}`
            }
        },
        ...resource._doc
    }
}

function serializeConnection(host, resource) {
    return {
        _links: {
            self: {
                href: `${host}/tag/${resource._id}`
            }
        },
        _embedded: {
            target:{
                name: resource.target,
                href: `${host}/connection/${resource._doc.target}`
            },
            source:{
                name: resource.source,
                href: `${host}/connection/${resource._doc.source}`
            },
            tags: resource._doc.tags.map(tag => ({
                        name: tag,
                        href: `${host}/tag/?name=${encodeURI(tag)}`,
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
                    href: `${host}/mapping/${resource._id}`
                }
            },
            _embedded: {
                assets: [
                    ...resource._doc.assets.map(asset => ({
                        name: asset,
                        href: `${host}/asset/?name=${encodeURI(asset)}`
                    }))
                ],
                tags: [
                    ...resource._doc.tags.map(tag => ({
                        name: tag,
                        href: `${host}/tag/?name=${encodeURI(tag)}`
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
                    href: `${host}/mapping/${mapping._id}`
                }
            },
            _embedded: {
                assets: [
                    ...mapping.assets.map(asset => ({
                        name: asset.name,
                        _id: asset._id,
                        href: `${host}/asset/${asset._id}`
                    }))
                ],
                tags: [
                    ...mapping.tags.map(tag => ({
                        _id: tag._id,
                        name: tag.name,
                        href: `${host}/tag/${tag._id}`
                    }))
                ],
            },
            description: mapping.description
        }

    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    serializeAsset,
    serializeConnection,
    serializeMapping,
    serializeMappingWithAssetIDs,
    serializeTag
};