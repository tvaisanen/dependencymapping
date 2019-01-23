import {ASSET, CONNECTION, MAPPING, TAG} from "../constants";

export function parseHALResponseData(resourceType, data) {
    if (resourceType === MAPPING) {
        console.group("parseHALResponseData()");
        console.info(data);
        console.groupEnd()
    }

    return HALResourceParser[resourceType](data);
}

const HALResourceParser = {
    [ASSET]: parseHALAsset,
    [CONNECTION]: parseHALConnection,
    [MAPPING]: parseHALMapping,
    [TAG]: parseTag,
};

function parseHALAsset(data) {
    return {
        _id: data._id,
        name: data.name,
        description: data.description,
        connected_to: data._embedded.connected_to.map(o => o.name),
        tags: data._embedded.tags.map(o => o.name),
        group: data._embedded.group.name,
        nodeColor: data.nodeColor,
        nodeShape: data.nodeShape,
    }
}

function parseHALConnection(data) {
    return {
        _id: data._id,
        description: data.description,
        source: data._embedded.source.name,
        target: data._embedded.target.name,
        tags: data._embedded.tags.map(o => o.name),
        edgeLabel: data.edgeLabel,
        sourceArrow: data.sourceArrow,
        targetArrow: data.targetArrow,
    }
}

function parseHALMapping(data) {
    return {
        _id: data._id,
        name: data.name,
        description: data.description,
        assets: data._embedded.assets.map(o => o.name),
        tags: data._embedded.tags.map(o => o.name),
    }
}

function parseTag(data) {
    const parsed = {
        _id: data._id,
        name: data.name,
        description: data.description,
    };
    console.info(data);
    console.info(parsed);

    return parsed;
}

export const parsers = {
    hal: HALResourceParser,
};
