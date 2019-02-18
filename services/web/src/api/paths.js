const {NODE_ENV, REACT_APP_API_PATH, REACT_APP_API_PORT, REACT_APP_API_HOST} = process.env;

const API_URL = REACT_APP_API_PATH;

export const API_HOST = REACT_APP_API_PATH;

export const MAPPINGS_URL = `${API_URL}mapping/`;
export const CONNECTIONS_URL = `${API_URL}connection/`;
export const TAGS_URL = `${API_URL}tag/`;
export const RESOURCES_URL = `${API_URL}asset/`;


export function tagDetailUrl({name}) {
    return `${TAGS_URL}${encodeURI(name)}/`;
}

export function connectionDetailUrl(connection) {
    return `${CONNECTIONS_URL}/${connection._id}`
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
