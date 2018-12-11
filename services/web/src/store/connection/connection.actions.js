//@flow

import GwClientApi from '../../api/gwClientApi';

import type { Connection, ConnectionAction } from "./connection.types";
import { SET_CONNECTIONS, ADD_CONNECTION } from "./connection.action-types";
import * as appActions from '../../actions/app.actions';
import * as assetActions from '../../store/asset/asset.actions';
import * as apiHelpers from '../../common/api.helpers';

export function setConnections (connections: Array<Connection>): ConnectionAction {
    return {type: SET_CONNECTIONS, connections}
}

export function loadAllConnections() {
    return function (dispatch) {

        const promise = GwClientApi.getConnections();

        promise.then(response => {
            console.info("loadAllConnections.then")
            dispatch(appActions.setInfoMessage("Loaded all connections successfully"));
            dispatch(setConnections((response.data: Array<Connection>)));
        }).catch(error => {
            console.warn(error);
            if (apiHelpers.isNetworkError(error)){
                console.log(error.response);
                dispatch(apiHelpers.handleNetworkError(error));
            } else {
                console.groupCollapsed("loadAllMappings()");
                console.info(error);
                console.groupEnd();
            }
        });
    }
}

export function postConnection(connection: Connection) {
    return function (dispatch: Dispatch, getState: State) {

        const promise = GwClientApi.postConnection(connection);
        const { assets } = getState();

        // the source asset needs to know about the new connection
        const assetToUpdate = assets.filter(asset => asset.name === connection.source)[0];
        const updatedAsset = {
            ...assetToUpdate,
            connected_to: [...assetToUpdate.connected_to, connection.target]
        };

        const resolveCallback = (connection) => {
            console.info('post connection resolve callback');
            console.info('set detail');
            console.info('update active mapping view');
            dispatch(appActions.setInfoMessage(`Created connection between: ${connection.source} and ${connection.target}`));
            dispatch(postConnectionSuccess(connection));
            // todo: add optional resolve at actions
            const { promise, resolveCallback } = dispatch(assetActions.updateAsset(updatedAsset));
            console.info(promise);
            console.info(resolveCallback);
            resolveCallback();
        };

        return {promise, resolveCallback};
    }
}

export function postConnectionSuccess(connection) {
    alert('post connection success')
    return {type: ADD_CONNECTION, connection}
}


export function deleteConnection(connection: Connection) {
    return function (dispatch: Dispatch, getState: State) {
        return GwClientApi.deleteConnection(connection.source, connection.target)
    }
}

export function updateConnection(connection: Connection) {
    return function (dispatch: Dispatch, getState: State) {
        return GwClientApi.putConnection(connection)
    }
}
