//@flow

import GwClientApi from '../../api/gwClientApi';

import type { Connection, ConnectionAction } from "./connection.types";
import { SET_CONNECTIONS } from "./connection.action-types";
import * as appActions from '../../actions/app.actions';
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
            console.warn(error)
            if (apiHelpers.isNetworkError(error)){
                console.log(error.response)
                dispatch(apiHelpers.handleNetworkError(error));
            } else {
                console.groupCollapsed("loadAllMappings()");
                console.info(error);
                console.groupEnd();
            }
        });
    }
}
