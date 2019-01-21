//@flow

import GwClientApi from '../../api/gwClientApi';
import * as _ from 'lodash';

import type {Connection, ConnectionAction} from "./connection.types";
import * as appActions from '../../actions/app.actions';
import * as assetActions from '../../store/asset/asset.actions';
import * as apiHelpers from '../../common/api.helpers';
import * as graphHelpers from '../../common/graph-helpers';


import {
    SET_CONNECTIONS,
    ADD_CONNECTION,
    DELETE_CONNECTION,
    DELETE_CONNECTIONS,
    UPDATE_CONNECTION,
    ADD_CONNECTIONS
} from "./connection.action-types";

export function setConnections(connections: Array<Connection>): ConnectionAction {
    return {type: SET_CONNECTIONS, connections}
}

export function loadAllConnections() {

    return async function (dispatch) {

        try {

            const response = await GwClientApi.getConnections();
            const connections: Array<Connection> = response.data;

            dispatch(
                appActions.setInfoMessage(
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
           return  `Created connection between: ${connection.source} \
                     and ${connection.target}`;
        }
    }
};

export function postConnection(connection: Connection, callback: (any) => void) {
    return async function (dispatch: Dispatch, getState: State) {

        try {
            // for updating the source assets
            // connected to list

            const response = await
                GwClientApi.postConnection(connection);

            // after response is resolved store
            // the received data as storedConnection
            const storedConnection = response.data;

            // update the state and sync related assets
            dispatch(postConnectionSuccess(storedConnection));
            dispatch(assetActions.syncConnectionSourceAsset(storedConnection));
            dispatch(appActions.setInfoMessage(infoMessages.post.success(connection)));

            // finally if caller provided callback function,
            // execute it with the response data as an argument
            callback ? callback(storedConnection) : null;


        } catch (err) {

        }
    }
}

export function postConnectionSuccess(connection) {
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


export function deleteConnection(connection: Connection, callback: (any) => void) {
    return async function (dispatch: Dispatch, getState: State) {

        try {

            // for updating the source assets
            // connected to list
            const {activeMapping, assets, graph} = getState();
            const activeMapAssets = activeMapping.assets;

            await
                GwClientApi
                    .deleteConnection(
                        connection.source,
                        connection.target
                    );

            // the source asset needs to know about the new connection
            const assetToUpdate = assets.filter(
                asset => asset.name === connection.source)[0];

            // make a updated version
            // of the updated asset
            const updatedAsset = {
                ...assetToUpdate,
                connected_to: assetToUpdate
                    .connected_to.filter(
                        asset => asset !== connection.target
                    )

            };

            dispatch(
                appActions.setInfoMessage(
                    `Deleted connection between: ${connection.source} \
                     and ${connection.target}`));

            dispatch(deleteConnectionSuccess(connection));
            dispatch(assetActions.updateAsset(updatedAsset));

            // if callback provided, run it with response data
            callback ? callback(connection) : null;

        } catch (err) {

        }
    }
}

export function deleteConnectionSuccess(connection) {
    return {type: DELETE_CONNECTION, connection}
}


export function updateConnection(connection: Connection, callback: (any) => void) {

    return async function (dispatch: Dispatch, getState: State) {

        try {

            // for updating the source assets
            // connected to list
            const {assets} = getState();

            console.group("update connection");
            console.info(connection);

            await
                GwClientApi.putConnection(connection);


            dispatch(updateConnectionSuccess(connection));
            console.groupEnd();

            // the source asset needs to know about the new connection
            const assetToUpdate = assets
                .filter(asset => {
                        console.info(`${asset.name} === ${connection.source}`)
                        return asset.name === connection.source
                    }
                )[0];

            console.info(assetToUpdate)

            // make a updated version
            // of the updated asset
            /*const updatedAsset = {
                ...assetToUpdate,
                connected_to: assetToUpdate
                    .connected_to.filter(
                        asset => asset !== connection.source
                    )
            };*/

            //alert(JSON.stringify(updatedAsset.connected_to))

            dispatch(
                appActions.setInfoMessage(
                    `Updated connection: ${connection.source} \
                     to ${connection.target}`));

            //dispatch(assetActions.updateAsset(updatedAsset));
            dispatch(graphHelpers.updateConnectionEdge(connection));

            // if callback provided, run it with response data
            callback ? callback(connection) : null;

        } catch (err) {
            console.info(err);
            alert('catch')
        }
    }
}


export function updateConnectionSuccess(connection) {
    console.group("updateConnectionSuccess");
    console.info(connection);
    console.groupEnd();
    return {type: UPDATE_CONNECTION, connection}
}

export function updateAssetConnections(asset: Asset) {
    return function (dispatch: Dispatch, getState: State) {


        let deleteList = [];
        let createList = [];
        let keepList = [];

        // todo: refactor to a reducer
        const c = getState()
            .connections
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
        })
        // console.group("updateAssetConnections");
        // console.debug(asset);
        // console.debug("deletelist");
        // console.debug(deleteList);
        // console.debug("createList");
        // console.debug(createList);
        // console.debug("keeplist");
        // console.debug(keepList);
        // console.groupEnd();

        dispatch(deleteConnections(deleteList));
        dispatch(addConnections(createList));

    }
}

export function deleteConnections(connections){
    return {type:DELETE_CONNECTIONS, connections};
}

// public namespace
export default {
    addConnection: addConnection,
    addConnections: addConnections,
    postConnection: postConnection,
    updateAssetConnections: updateAssetConnections
}