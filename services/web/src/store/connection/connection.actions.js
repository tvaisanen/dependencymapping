//@flow

import GwClientApi from '../../api/gwClientApi';
import * as _ from 'lodash';

import {CONNECTION} from "../../constants";

import type {
    Asset,
    Connection,
    ConnectionAction,
    Dispatch,
    State
} from "../types";
import {setInfoMessage} from '../../store/ui/ui.actions';
import {updateAsset, syncConnectionSourceAsset} from '../../store/asset/asset.actions';
import * as apiHelpers from '../../api/api.utils';
import * as graphHelpers from '../../common/graph-helpers';

import {parseHALResponseData} from "../response-parser";

import {
    SET_CONNECTIONS,
    ADD_CONNECTION,
    DELETE_CONNECTION,
    DELETE_CONNECTIONS,
    UPDATE_CONNECTION,
    ADD_CONNECTIONS
} from "./connection.action-types";
import type {FormAndOptionalCallback} from "../store-action.arg-types";

const api = GwClientApi;

export function setConnections(connections: Array<Connection>): ConnectionAction {
    return {type: SET_CONNECTIONS, connections}
}

export function loadAllConnections() {

    return async function (dispatch: Dispatch) {

        try {

            // ! todo: refactor
            const response = await GwClientApi.getConnections();
            const connections: Array<Connection> = response
                .data
                .map(c =>
                    parseHALResponseData(CONNECTION, c));

            dispatch(
                setInfoMessage(
                    "Loaded all connections successfully"));
            dispatch(setConnections(connections));

        } catch (err) {
            console.warn(err);
            if (apiHelpers.isNetworkError(err)) {
                console.log(err.response);
                dispatch(apiHelpers.handleNetworkError(err));
            } else {
                console.groupCollapsed("loadAllMappings()");
                console.info(err);
                console.groupEnd();
            }
        }
    }
}

const infoMessages = {
    post: {
        success: (connection: Connection) => {
            return `Created connection between: ${connection.source} \
                     and ${connection.target}`;
        }
    }
};

export function postConnection(props: FormAndOptionalCallback) {
    return async function (dispatch: Dispatch, getState: State) {

        try {

            const {form, callback} = props;

            const storedConnection = await
                api
                    .connection
                    .post(form)
                    .parseResponseContent();


            dispatch(postConnectionSuccess(storedConnection));
            dispatch(syncConnectionSourceAsset(storedConnection));
            dispatch(setInfoMessage(infoMessages.post.success(storedConnection)));

            if (callback) {
                callback(storedConnection)
            }

        } catch (err) {
            alert("todo: handle postconnection error")
            throw new Error(err)
        }
    }
}

export function postConnectionSuccess(connection: Connection) {
    return {type: ADD_CONNECTION, connection}
}

export function addConnection(connection: Connection) {
    return {type: ADD_CONNECTION, connection};
}

/**
 *  Add a array of connections
 *
 */
export function addConnections(connections: Array<Connection>) {
    return {type: ADD_CONNECTIONS, connections};
}


export function deleteConnection(props: FormAndOptionalCallback) {
    return async function (dispatch: Dispatch, getState: State) {

        console.info(props)
        try {

            // for updating the source assets
            // connected to list
            const {form, callback} = props;
            const connection = form;
            const {assets} = getState();

            await api.connection.delete(form);

            // the source asset needs to know about the new connection
            const assetToUpdate = assets.filter(
                asset => asset.name === connection.source)[0];

            const updatedAsset = {
                ...assetToUpdate,
                connected_to: assetToUpdate
                    .connected_to.filter(
                        asset => asset !== connection.target
                    )
            };

            dispatch(setInfoMessage(
                `Deleted connection between: ${connection.source} \
                     and ${connection.target}`));

            dispatch(deleteConnectionSuccess(connection));
            dispatch(updateAsset({form: updatedAsset}));

            // if callback provided, run it with response data
            if (callback) {
                callback(connection);
            }

        } catch (err) {
            alert("todo: handle delete connection error");
            throw new Error(err)
        }
    }
}

export function deleteConnectionSuccess(connection: Connection) {
    return {type: DELETE_CONNECTION, connection}
}


export function updateConnection(props: FormAndOptionalCallback) {

    return async function (dispatch: Dispatch, getState: State) {

        try {

            // for updating the source assets
            // connected to list
            const {form, callback} = props;
            const updatedConnection = await
                api
                    .connection
                    .put(form)
                    .parseResponseContent();


            dispatch(updateConnectionSuccess(updatedConnection));

            dispatch(setInfoMessage(
                    `Updated connection: ${updatedConnection.source} \
                     to ${updatedConnection.target}`));

            //dispatch(assetActions.updateAsset(updatedAsset));
            dispatch(graphHelpers.updateConnectionEdge(updatedConnection));

            // if callback provided, run it with response data
            if (callback) {
                callback(updatedConnection)
            }


        } catch (err) {
            alert("todo: handle update connection error");
            throw new Error(err)
        }
    }
}


export function updateConnectionSuccess(connection: Connection) {
    return {type: UPDATE_CONNECTION, connection}
}

export function updateAssetConnections(asset: Asset) {
    return function (dispatch: Dispatch, getState: State) {

        const {connections} = getState();

        let deleteList = [];
        let createList = [];
        let keepList = [];

        // todo: refactor to a reducer
        connections
            .forEach(connection => {
                const assetIsSource = asset.name === connection.source;
                const targetIsConnectedTo = _.includes(asset.connected_to, connection.target);

                if (assetIsSource && targetIsConnectedTo) {
                    // connection exists
                    keepList.push(connection.target);

                } else if (assetIsSource && !targetIsConnectedTo) {
                    // connection should be deleted
                    deleteList.push(connection);
                }
            });


        asset.connected_to.forEach(target => {
            if (!_.includes(keepList, target)) {
                createList.push({
                    source: asset.name,
                    target: target,
                    tags: [],
                    description: "",
                    targetArrow: true,
                    sourceArrow: false,
                    edgeLabel: ""
                });
            }
        });


        dispatch(deleteConnections(deleteList));
        dispatch(addConnections(createList));

    }
}

export function deleteConnections(connections: Array<Connection>) {
    return {type: DELETE_CONNECTIONS, connections};
}

// public namespace
export default {
    addConnection: addConnection,
    addConnections: addConnections,
    postConnection: postConnection,
    updateAssetConnections: updateAssetConnections
}