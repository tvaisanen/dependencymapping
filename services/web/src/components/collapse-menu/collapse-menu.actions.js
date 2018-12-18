import * as mappingActions from '../../store/mapping/mapping.actions';
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
    return async function (dispatch, getState) {
        try {
            dispatch(mappingActions.updateMapping(getState().activeMapping));
            dispatch(appActions.toggleCollapseMenu());
        } catch (err) {
            alert(`collapse-menu.actions.saveMapping() :: ${err}`)
        }
    }
}