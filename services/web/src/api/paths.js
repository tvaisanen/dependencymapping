const {NODE_ENV, REACT_APP_API_PATH, REACT_APP_API_PORT, REACT_APP_API_HOST} = process.env;

const API_URL = REACT_APP_API_PATH;

export const API_HOST = REACT_APP_API_PATH;

export const MAPPINGS_URL = `${API_URL}/mapping/`;
export const CONNECTIONS_URL = `${API_URL}/connection/`;
export const TAGS_URL = `${API_URL}/tag/`;
export const RESOURCES_URL = `${API_URL}/asset/`;
export const ASSETS_URL = `${API_URL}/asset/`;

console.group("Api client config");
console.info(`URI: ${API_HOST}`);
console.groupEnd();


export const mapping = {
    collection: MAPPINGS_URL,
    post: MAPPINGS_URL,
    detail: {
        byId: (id)      => `${MAPPINGS_URL}${encodeURI(id)}/`,
        byName: (name)  => `${MAPPINGS_URL}byName/${encodeURI(name)}/`
    }
};

export const asset = {
    collection: ASSETS_URL,
    post: ASSETS_URL,
    detail: {
        byId: (id)      => `${ASSETS_URL}${encodeURI(id)}/`,
        byName: (name)  => `${ASSETS_URL}byName/${encodeURI(name)}/`
    }
};

export const connection = {
    collection: CONNECTIONS_URL,
    post: CONNECTIONS_URL,
    detail: {
        byId: (id)      => `${CONNECTIONS_URL}${encodeURI(id)}/`,
        byName: (name)  => `${CONNECTIONS_URL}byName/${encodeURI(name)}/`,
        byEndPoints: (connection) => `${CONNECTIONS_URL}?source=${encodeURI(connection.source)}&target=${encodeURI(connection.target)}`
    }
};

export const tag = {
    collection: TAGS_URL,
    post: TAGS_URL,
    detail: {
        byId: (id)      => `${TAGS_URL}${encodeURI(id)}/`,
        byName: (name)  => `${TAGS_URL}byName/${encodeURI(name)}/`
    }
};

export function assetDetailUrlByName(name){
    return `${ASSETS_URL}byName/${encodeURI(name)}/`;
}

export function assetDetailUrlById(id){
    return `${ASSETS_URL}${encodeURI(id)}/`;
}

export function tagDetailUrl(props) {
    return `${TAGS_URL}/${encodeURI(props._id)}/`;
}

export function tagDetailUrlById(id) {
    return `${TAGS_URL}/${encodeURI(id)}/`;
}

export function connectionDetailUrl(connection) {
    return `${CONNECTIONS_URL}${connection._id}`
}

export function connectionDetailBySourceAndTarget(connection) {
    return `${CONNECTIONS_URL}?source=${encodeURI(connection.source)}&target=${encodeURI(connection.target)}`;
}

export function mappingsDetailUrl({name}) {
    return `${MAPPINGS_URL}${encodeURI(name)}/`;
}

export function resourceDetailUrl({name}) {
    return `${RESOURCES_URL}${encodeURI(name)}/`;
}
/* ****************************************** */

export default {
    asset,
    connection,
    mapping,
    tag
}
