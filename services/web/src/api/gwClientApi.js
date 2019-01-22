// @flow
import axios from 'axios';
import type { Asset, Connection, Mapping, Tag } from "../store/types";

const API_HOST = process.env.REACT_APP_API_HOST || "localhost"
const API_URL = `http://${API_HOST}/`;

// const MAPPINGS_URL = `${API_URL}mappings/`;
// const TAGS_URL = `${API_URL}tags/`;
// const RESOURCES_URL = `${API_URL}assets/`;

const MAPPINGS_URL = `${API_URL}mapping/`;
const CONNECTIONS_URL = `${API_URL}connection/`;
const TAGS_URL = `${API_URL}tag/`;
const RESOURCES_URL = `${API_URL}asset/`;
const ASSET_GROUPS_URL = `${API_URL}asset-group/`;

const LOGIN_URL = `${API_URL}rest-auth/login/`;

console.group("Api client config");
console.info(`api host: ${API_HOST}`);
console.groupEnd();

function tagDetailUrl({name}) {
    return `${TAGS_URL}${encodeURI(name)}/`;
}

function connectionDetailUrl(connection) {
    return `${CONNECTIONS_URL}?source=${encodeURI(connection.source)}&target=${encodeURI(connection.target)}`;
}

function mappingsDetailUrl({name}) {
    return `${MAPPINGS_URL}${encodeURI(name)}/`;
}

function resourceDetailUrl({name}) {
    return `${RESOURCES_URL}${encodeURI(name)}/`;
}

//;
//axios.get('https://something.com/foo', { httpsAgent: agent });

//console.group("Process ENVIRONMENT");
/*
let agent;
if (process.env.NODE_ENV === "development") {
    console.info("set TLS :: rejectUnauthorized = false");
    agent = new https.Agent({
        rejectUnauthorized: false
    });
} else {
    agent = new https.Agent();
}
*/
// console.info(process.env);
// console.groupEnd();

function setAuthHeader() {
    /*
    const token = JSON.parse(localStorage.getItem('auth')).key;

    axios.defaults.headers.common['Authorization'] =  `Token ${token}`;
    */
}

class GwClientApi {

    /*
    static login({email, username, password}) {
        return axios.post(LOGIN_URL, {
            username: username,
            email: email,
            password: password,
        });
    }
    */

    static resetModels () {
        /** for development
            reset the test data on refresh
         */
        axios.get("http://localhost:3000/reset-models");
    }

    // todo: refactor to getMappings
    static getGraphs() {
        console.log(MAPPINGS_URL);
        return axios.get(MAPPINGS_URL, {
            Authorization: setAuthHeader()
        });
    }

    static getConnections() {
        return axios.get(CONNECTIONS_URL);
    }

    static getConnectionsByAsset(assetName: string) {
        return axios.get(`${CONNECTIONS_URL}?source=${encodeURIComponent(assetName)}`)
    }

    static getAssets() {
        return axios.get(RESOURCES_URL);
    }

    static getTags() {
        return axios.get(TAGS_URL);
    }


    /********************** ConnectionMETHODS **********************/

    static postConnection(connection: Connection): Promise<any> {
        return axios.post(CONNECTIONS_URL, connection)
    }

    static putConnection(connection: Connection): Promise<any> {
        console.info(connection)
        const {source, target} = connection;
        const uri = connectionDetailUrl({source, target});
        console.info(uri)
        return axios.put(uri, connection);
    }

    static deleteConnection(source: string, target:string): Promise<any> {
        const uri = connectionDetailUrl({source, target});
        return axios.delete(uri);
    }

    /** ***********************************************************/

    /********************** MAPPING METHODS **********************/

    static postMapping(mapping: Mapping): Promise<any> {
        return axios.post(MAPPINGS_URL, mapping)
    }

    static putMapping(mapping: Mapping): Promise<any> {
        return axios.put(mappingsDetailUrl({name:mapping.name}),mapping);
    }

    static deleteMapping(name: string) {
        return axios.delete(mappingsDetailUrl({name}));
    }

    /** ***********************************************************/

    static deleteAsset(name: string): Promise<any> {
        return axios.delete(resourceDetailUrl({name}));
    }

    static postAsset(asset: Asset): Promise<any> {
        return axios.post(RESOURCES_URL, asset);
    }

    static putAsset(asset: Asset): Promise<any> {
        console.groupCollapsed("putMapping(asset)");
        console.info(asset)
        console.groupEnd();
        return axios.put(
            resourceDetailUrl({name: asset.name}),
            asset
        );
    }

    static postTag(tag: Tag) {
        return axios.post(TAGS_URL, tag)
    }

    static putTag(tag: Tag) {
        const path = tagDetailUrl(tag);
        return axios.put(path, tag)
    }

    static deleteTag(name: string): Promise<any> {
        return axios.delete(tagDetailUrl({name}));
    }
}

export default GwClientApi;