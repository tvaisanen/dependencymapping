import * as mappingActions from '../../store/mapping/mapping.actions';
import * as authActions from '../../store/auth/auth.actions';
import * as activeMappingActions from '../../store/active-mapping/active-mapping.actions';
import { toggleCollapseMenu } from '../../store/ui/ui.actions';

import * as graphHelpers from './../../common/graph-helpers';

export function downloadImage() {
    return function (dispatch, getState) {
        graphHelpers.downloadPng(getState().graph);
        dispatch(toggleCollapseMenu());
    }
}

export function logout() {
    return function (dispatch) {
        dispatch(authActions.logout());
        dispatch(toggleCollapseMenu());
    }
}

export function clearGraph() {
    return function (dispatch,getState) {
        dispatch(activeMappingActions.clearActiveMappingSelection());
        graphHelpers.clearGraph(getState().graph);
        dispatch(toggleCollapseMenu());
    }
}

export function saveMapping() {
    return async function (dispatch, getState) {
        try {
            dispatch(mappingActions.updateMapping({form:getState().activeMapping}));
            dispatch(toggleCollapseMenu());
        } catch (err) {
            alert(`collapse-menu.actions.saveMapping() :: ${err}`)
        }
    }
}