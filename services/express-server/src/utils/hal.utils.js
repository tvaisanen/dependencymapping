function getHALJSON(host, resourcetype, resource) {

    console.log(resource._doc)
    console.log(Object.keys(resource))
    return {
        _links: {
            self: {
                href: `${host}/${resourcetype}/${resource._id}`
            }
        },
        ...resource._doc
    }
}
function serializeAsset(host, resource) {

    return {
        _links: {
            self: {
                // todo: use constants
                href: `${host}/asset/${resource._id}`
            }
        },
        _embedded: {
            connected_to: [
                ...resouce._doc.connected_to.map(asset => ({
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
}

function serializeTag(host, resource){
    return {
        _links: {
            self: {
                href: `${host}/tag/${resource._id}`
            }
        },
        ...resource._doc
    }
}


module.exports = {
    serializeAsset,
    serializeTag
};