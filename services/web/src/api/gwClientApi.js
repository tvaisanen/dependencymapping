// @flow
import axios from 'axios';
import type {Asset, Connection, Mapping, Tag} from "../store/types";
import {ASSET, CONNECTION, MAPPING, TAG} from "../constants";
import {parsers} from "../store/response-parser";

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

// * refactor to utils.js or something

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

/* ****************************************** */


class ParserConfig {

    constructor(resourceType) {
        this.parseResponseData = parsers.hal[resourceType]
    }
}

function createApiResponse(promise, config) {

    return new Promise((resolve, reject) => {

        promise
            .then(response => {
                Object.setPrototypeOf(response, new ApiResponse(response, config));

                console.groupCollapsed(
                    `  %cOK\t%cAPI::${response.config.method}:${response.config.url}`,
                    "color: green",
                    "color:black"
                );

                console.info(response);
                console.groupEnd();

                resolve(response);
            })
            .catch(err => {


                console.groupCollapsed(
                    `%c\tERROR %cAPI::${err.response.config.method}:${err.response.config.url}`,
                    "color: red",
                    "color:black"
                );
                console.info(Object.keys(err));
                console.info(err)
                console.groupEnd();
                reject(err)
            })
            .finally();
    })
}

class ApiResponse {
    constructor(serverPromise, config={}) {
        this.config = config || null;
        this.promise = serverPromise;
        this.test = config.test;
    }
    async parseResponseContent () {
            //? all actions migrated to use this?
            //  console.groupCollapsed("parserResponseData");
            //  console.info(serverResponse.data);
            //  console.groupEnd();
            //  if collection -> if response is an array

            console.info(this.promise)
            try {

                const serverResponse = await this.promise;
                console.info(serverResponse)

                if (Array.isArray(serverResponse.data)) {
                    return serverResponse
                        .data
                        .map(o =>
                            this.config.parseResponseData(o))

                } else {
                    // response.data.map(:w
                    // o => config.parseResponseData(o))
                    // if detail -> if response is an object
                    return this.config.parseResponseData(serverResponse.data);
                }
            } catch (err) {
                console.error(err);
                throw new Error("ApiResponse.parseResponseContent", err.stack)
            }
        };
}


class Client {

    static resetModels() {
        /** for development
         reset the test data on refresh
         */
        return createApiResponse(axios.get("http://localhost:3000/reset-models"));
    }

    static apiCall(fn, parserConfig, args = {}) {

        const promise = fn(args);

        console.groupCollapsed(
            `%c  REQUEST \n%c> %capiClient.${fn.name}(${Object.keys(args)})`,
            "color: purple",
            "color: lightgrey",
            "color:black"
        );

        console.info("%cargs:", "color: grey");
        console.info(args);
        console.info(promise);
        console.groupEnd();

        return new ApiResponse(promise, parserConfig);
    }

    static asset = {
        getAll: args => Client.apiCall(Client.getAssets, new ParserConfig(ASSET), args),
        post: args => Client.apiCall(Client.postAsset, new ParserConfig(ASSET), args),
        put: args => Client.apiCall(Client.putAsset, new ParserConfig(ASSET), args)
    };

    static mapping = {
        getAll: args => Client.apiCall(Client.getMappings, new ParserConfig(MAPPING), args),
        post: args => Client.apiCall(Client.postMapping, new ParserConfig(MAPPING), args),
        put: args => Client.apiCall(Client.putMapping, new ParserConfig(MAPPING), args)
    };


    // todo: refactor to getMappings
    static getMappings() {
        return axios.get(MAPPINGS_URL);
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

    static deleteConnection(source: string, target: string): Promise<any> {
        const uri = connectionDetailUrl({source, target});
        return axios.delete(uri);
    }

    /** ***********************************************************/

    /********************** MAPPING METHODS **********************/

    static postMapping(mapping: Mapping): Promise<any> {
        return axios.post(MAPPINGS_URL, mapping)
    }

    static putMapping(mapping: Mapping): Promise<any> {
        return axios.put(mappingsDetailUrl({name: mapping.name}), mapping);
    }

    static deleteMapping(name: string) {
        return axios.delete(mappingsDetailUrl({name}));
    }

    /** ***********************************************************/

    static deleteAsset(name: string): Promise<any> {
        return axios.delete(resourceDetailUrl({name}));
    }

    static postAsset(asset: Asset): Promise<any> {
        return createApiResponse(
            axios.post(RESOURCES_URL, asset),
            new ParserConfig(ASSET)
        )

    }

    static putAsset(asset: Asset): Promise<any> {
        // console.groupCollapsed("putMapping(asset)");
        // console.info(asset)
        // console.groupEnd();
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

type APIRequest = {
    resource: string,
    method: string
}


export function apiCall(apiRequest: APIRequest) {
    /*
    console.groupCollapsed(
        `%c\tapiCall.${apiRequest.resource}.${apiRequest.method}`,
        "color: blue",
        "color:black"
    );
    */

    return {
        asset: assetCall
    }

}

apiCall.defaultProps = {resource: "", method: "get"};

const assetCall = {
    getAll: (test) => console.log('apiCall.asset')
}

export default Client;