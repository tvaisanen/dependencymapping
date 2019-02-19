import * as types from './ui.action-types';
import * as views from '../../constants/views';

export function setInfoMessage(infoMessage){
    return {type: types.SET_INFO_MESSAGE, infoMessage};
}

export function setGraphLayout(layout){
    return {type: types.SET_GRAPH_LAYOUT, layout};
}

export function setFormType(formType){
    return {type: types.SET_FORM_TYPE, formType};
}

export function setBottomPanelView(view){
    return {type: types.SET_BOTTOM_PANEL_VIEW, view};
}

export function setEditDetail(){
    return {type: types.SET_EDIT_DETAIL}
}

export function setEditFalse(){
    return {type: types.CANCEL_EDIT};
}

export function toggleCollapseMenu(){
    return {type: types.TOGGLE_COLLAPSE_MENU};
}

export function collapseBottomPanel(){
    return function (dispatch, getState) {
        const graph = getState().graph;
        // resize the graph canvas
        setTimeout(()=> graph.resize(), 15);
        dispatch({type: types.COLLAPSE_BOTTOM_PANEL})
    }
}

export function showBottomPanel(){
    return function (dispatch, getState) {
        const graph = getState().graph;
        // resize the graph canvas
        setTimeout(()=> graph.resize(), 15);
        dispatch({type: types.SHOW_BOTTOM_PANEL})
    }
}

export function toggleBottomPanel(){
    return function (dispatch, getState) {
        const graph = getState().graph;
        // resize the graph canvas
        setTimeout(()=> graph.resize(), 15);
        dispatch({type: types.TOGGLE_BOTTOM_PANEL})
    }
}


export function editDetail(){
    return function(dispatch, getState){
        dispatch(setEditDetail());
        dispatch(setFormType(getState().activeDetail.type))
        dispatch(setBottomPanelView(views.CREATE));
    }
}

export function setErrorMessage(errorMessage){
    return {type: types.SET_ERROR_MESSAGE, errorMessage}
}

export function clearErrorMessage(){
    return {type: types.CLEAR_ERROR_MESSAGE}
}
