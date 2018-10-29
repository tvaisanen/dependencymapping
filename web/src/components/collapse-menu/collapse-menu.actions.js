import * as mappingActions from '../../actions/mapping.actions';
import * as authActions from '../../store/auth/auth.actions';
import * as activeMappingActions from '../../store/active-mapping/active-mapping.actions';
import * as appActions from '../../actions/app.actions';

import * as graphHelpers from './../../common/graph-helpers';

export function downloadImage() {
    return function (dispatch, getState) {
        graphHelpers.downloadPng(getState().graph);
        dispatch(appActions.toggleCollapseMenu());
    }
}

export function logout() {
    return function (dispatch) {
        dispatch(authActions.logout());
        dispatch(appActions.toggleCollapseMenu());
    }
}

export function clearGraph() {
    return function (dispatch,getState) {
        dispatch(activeMappingActions.clearActiveMappingSelection());
        graphHelpers.clearGraph(getState().graph);
        dispatch(appActions.toggleCollapseMenu());
    }
}

export function saveMapping() {
    return function (dispatch, getState) {
        const {promise, resolveCallback} = dispatch(mappingActions.updateMapping(getState().activeMapping));
        promise.then(response => {
           resolveCallback(response.data);

        }).catch(error => {
            console.group("saveMapping() ->  <Error>");
            console.warn(error);
            console.groupEnd();
        });
        dispatch(appActions.toggleCollapseMenu());
    }
}