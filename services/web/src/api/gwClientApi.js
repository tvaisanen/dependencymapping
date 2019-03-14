// @flow
import axios from 'axios';
import type {Asset, Connection, Mapping, Tag} from "../store/types";
import {ASSET, CONNECTION, MAPPING, TAG} from "../constants";
import ResponseParserConfig from './response-parser.config';
import paths from "./paths";
import { createApiResponse } from './api-client.utils';
import ApiResponse from './ApiResponse';

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
        console.info(parserConfig);
        console.info(args);
        console.info(promise);
        console.groupEnd();

        return new ApiResponse(promise, parserConfig);
    }


    /********************** ASSET METHODS **********************/


    /** asset api calls */
    static asset = {
        getByName:      args => Client.apiCall(Client.getAssetByName,       assetParser, args),
        getAll:         args => Client.apiCall(Client.getAssets,            assetParser, args),
        putById:        args => Client.apiCall(Client.putAssetById,         assetParser, args),
        post:           args => Client.apiCall(Client.postAsset,            assetParser, args),
        deleteById:     args => Client.apiCall(Client.deleteAssetById,      assetParser, args),
        deleteByName:   args => Client.apiCall(Client.deleteAssetByName,    assetParser, args),
    };

    static getAssets() {
        return axios.get(paths.asset.collection);
    }

    static getAssetByName(name: string): Promise<any> {
        const url = paths.asset.detail.byName(name)
        return axios.delete(url);
    }

    static deleteAssetById(id: string): Promise<any> {
        const url = paths.asset.detail.byId(id);
        return axios.delete(url);
    }

    static deleteAssetByName(name: string): Promise<any> {
        const url = paths.asset.detail.byName(name)
        return axios.delete(url);
    }

    static postAsset(asset: Asset): Promise<any> {
        return axios.post(paths.asset.collection, asset);
    }

    static putAssetById(asset: Asset): Promise<any> {
        const url = paths.asset.detail.byId(asset._id);
        return axios.put(url, asset);
    }

    static putAssetByName(asset: Asset): Promise<any> {
        const url = paths.asset.detail.byName(asset.name)
        return axios.put(url, asset);
    }

    /********************** CONNECTION METHODS **********************/


    /** connection api calls */
    static connection = {
        getAll:         args => Client.apiCall(Client.getConnections, connectionParser, args),
        //get:          args => Client.apiCall(Client.getAsset, new ParserConfig(ASSET), args),
        put:            args => Client.apiCall(Client.putConnection, connectionParser, args),
        putByEndpoints: args => Client.apiCall(Client.putConnectionByEndpoints, connectionParser, args),
        post:           args => Client.apiCall(Client.postConnection, connectionParser, args),
        deleteById:     args => Client.apiCall(Client.deleteConnectionById, connectionParser, args),
        deleteByName:   args => Client.apiCall(Client.deleteConnectionByEndpoints, connectionParser, args),
    };

    static getConnections() {
        return axios.get(paths.connection.collection);
    }

    static postConnection(connection: Connection): Promise<any> {
        return axios.post(paths.connection.post, connection)
    }

    static putConnection(connection: Connection): Promise<any> {
        const url= paths.connection.detail.byId(connection._id);
        return axios.put(url, connection);
    }

    static putConnectionByEndpoints(connection: Connection): Promise<any> {
        const url= paths.connection.detail.byEndPoints(connection);
        return axios.put(url, connection);
    }

    static deleteConnectionByEndpoints(connection: Connection): Promise<any> {
        const url = paths.connection.detail.byEndPoints(connection);
        return axios.delete(url);
    }

    static deleteConnectionById(connection: Connection): Promise<any> {
        const url = paths.connection.detail.byId(connection._id);
        return axios.delete(url);
    }


    /********************** MAPPING METHODS **********************/

    /** mapping api calls */
    static mapping = {
        getAll:         args => Client.apiCall(Client.getMappings, mappingParser, args),
        //get:          args => Client.apiCall(Client.getAsset, new ParserConfig(ASSET), args),
        put:            args => Client.apiCall(Client.putMapping, mappingParser, args),
        post:           args => Client.apiCall(Client.postMapping, mappingParser, args),
        deleteById:     args => Client.apiCall(Client.deleteMappingById, mappingParser, args),
        deleteByName:   args => Client.apiCall(Client.deleteMappingByName, mappingParser, args),
    };

    static getMappings() {
        return axios.get(paths.mapping.collection);
    }

    static postMapping(mapping: Mapping): Promise<any> {
        return axios.post(paths.mapping.post, mapping)
    }

    static putMapping(mapping: Mapping): Promise<any> {
        const url = paths.mapping.detail.byId(mapping._id)
        return axios.put(url, mapping);
    }

    static deleteMappingByName(name: string) {
        const url = paths.mapping.detail.byName(name)
        return axios.delete(url);
    }

    static deleteMappingById(id: string) {
        const url = paths.mapping.detail.byId(id)
        return axios.delete(url);
    }



    /********************** TAG METHODS **********************/

    /** tag api calls */
    static tag = {
        getAll:     args => Client.apiCall(Client.getTags, tagParser, args),
        //get:    args => Client.apiCall(Client.getAsset, new ParserConfig(ASSET), args),
        put:        args => Client.apiCall(Client.putTag, tagParser, args),
        post:       args => Client.apiCall(Client.postTag, tagParser, args),
        deleteById: args => Client.apiCall(Client.deleteTagById, tagParser, args),
    };

    static getTags() {
        return axios.get(paths.tag.collection);
    }

    static postTag(tag: Tag) {
        return axios.post(paths.tag.post, tag)
    }

    static putTag(tag: Tag) {
        const url = paths.tag.detail.byName(tag.name);
        return axios.put(url, tag)
    }

    static deleteTagByName(name): Promise<any> {
        const url = paths.tag.detail.byName(name);
        return axios.delete(url);
    }

    static deleteTagById(id): Promise<any> {
        const url = paths.tag.detail.byId(id);
        return axios.delete(url);
    }
}


export default Client;