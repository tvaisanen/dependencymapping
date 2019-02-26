// @flow
import axios from 'axios';
import type {Asset, Connection, Mapping, Tag} from "../store/types";
import {ASSET, CONNECTION, MAPPING, TAG} from "../constants";
import ResponseParserConfig from './response-parser.config';
import {
    tagDetailUrl,
    tagDetailUrlById,
    connectionDetailUrl,
    connectionDetailBySourceAndTarget,
    mappingsDetailUrl,
    resourceDetailUrl,
    assetDetailUrlByName,
    assetDetailUrlById,
    API_HOST,
    MAPPINGS_URL,
    CONNECTIONS_URL,
    RESOURCES_URL,
    TAGS_URL
} from "./paths";
import { createApiResponse } from './api-client.utils';
import ApiResponse from './ApiResponse';


console.group("Api client config");
console.info(`URI: ${API_HOST}`);
console.groupEnd();


const assetParser = new ResponseParserConfig(ASSET);
const connectionParser = new ResponseParserConfig(CONNECTION);
const mappingParser = new ResponseParserConfig(MAPPING);
const tagParser = new ResponseParserConfig(TAG);

class Client {

    static resetModels() {
        /** for development
         reset the test data on refresh
         */
        return createApiResponse(axios.get("http://localhost:3000/reset-models"));
    }

    static apiCall(fn, parserConfig, args = {}): ApiResponse {

        const promise = fn(args);

        console.groupCollapsed(
            `%c  REQUEST \n%c> %capiClient.${fn.name}(${Object.keys(args)})`,
            "color: purple",
            "color: lightgrey",
            "color:black"
        );

        console.info("%cargs:", "color: grey");
        console.info(parserConfig)
        console.info(args);
        console.info(promise);
        console.groupEnd();

        return new ApiResponse(promise, parserConfig);
    }


    /** asset api calls */
    static asset = {
        getByName:      args => Client.apiCall(Client.getAssetByName,       assetParser, args),
        getAll:         args => Client.apiCall(Client.getAssets,            assetParser, args),
        put:            args => Client.apiCall(Client.putAsset,             assetParser, args),
        post:           args => Client.apiCall(Client.postAsset,            assetParser, args),
        delete:         args => Client.apiCall(Client.deleteAsset,          assetParser, args),
        deleteById:     args => Client.apiCall(Client.deleteAssetById,      assetParser, args),
        deleteByName:   args => Client.apiCall(Client.deleteAssetByName,    assetParser, args),
    };

    /** connection api calls */
    static connection = {
        getAll:     args => Client.apiCall(Client.getConnections, connectionParser, args),
        //get:    args => Client.apiCall(Client.getAsset, new ParserConfig(ASSET), args),
        put:        args => Client.apiCall(Client.putConnection, connectionParser, args),
        post:       args => Client.apiCall(Client.postConnection, connectionParser, args),
        delete:     args => Client.apiCall(Client.deleteConnection, connectionParser, args),
        deleteById: args => Client.apiCall(Client.deleteConnectionById, connectionParser, args),
    };

    /** mapping api calls */
    static mapping = {
        getAll:     args => Client.apiCall(Client.getMappings, mappingParser, args),
        //get:    args => Client.apiCall(Client.getAsset, new ParserConfig(ASSET), args),
        put:        args => Client.apiCall(Client.putMapping, mappingParser, args),
        post:       args => Client.apiCall(Client.postMapping, mappingParser, args),
        delete:     args => Client.apiCall(Client.deleteMapping, mappingParser, args),
        deleteById: args => Client.apiCall(Client.deleteMappingById, mappingParser, args),
    };

    /** tag api calls */
    static tag = {
        getAll: args => Client.apiCall(Client.getTags, tagParser, args),
        //get:    args => Client.apiCall(Client.getAsset, new ParserConfig(ASSET), args),
        put:    args => Client.apiCall(Client.putTag, tagParser, args),
        post:   args => Client.apiCall(Client.postTag, tagParser, args),
        delete: args => Client.apiCall(Client.deleteTag, tagParser, args),
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
        // const uri = connectionDetailBySourceAndTarget({source, target});
        const uri = connectionDetailUrl(connection);
        return axios.put(uri, connection);
    }

    static deleteConnection(connection: Connection): Promise<any> {
        const { source, target } = connection;
        const uri = connectionDetailBySourceAndTarget({source, target});
        return axios.delete(uri);
    }


    static deleteConnectionById(connection: Connection): Promise<any> {
        const uri = connectionDetailUrl(connection);
        return axios.delete(uri);
    }


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

    static deleteMappingById(id: string) {
        //return axios.delete(mappingsDetailUrlById(id));
    }

    /** ***********************************************************/

    static getAssetByName(name: string): Promise<any> {
        return axios.delete(assetDetailUrlByName(name));
    }

    static deleteAssetById(id: string): Promise<any> {
        return axios.delete(assetDetailUrlById(id));
    }

    static deleteAssetByName(name: string): Promise<any> {
        return axios.delete(assetDetailUrlByName(name));
    }

    static deleteAsset(name: string): Promise<any> {
        return axios.delete(assetDetailUrlByName(name));
    }

    static postAsset(asset: Asset): Promise<any> {
        return axios.post(RESOURCES_URL, asset);
    }

    static putAsset(asset: Asset): Promise<any> {
        const path = resourceDetailUrl({name: asset.name});
        return axios.put(path, asset);
    }

    static postTag(tag: Tag) {
        return axios.post(TAGS_URL, tag)
    }

    static putTag(tag: Tag) {
        const path = tagDetailUrl(tag);
        return axios.put(path, tag)
    }

    static deleteTag(props): Promise<any> {
        alert(JSON.stringify(props))
        return axios.delete(tagDetailUrlById(props._id));
    }
}


export default Client;