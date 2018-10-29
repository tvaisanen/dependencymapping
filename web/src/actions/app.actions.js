import * as types from './actionTypes';
import * as views from '../constants/views';

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


export function editDetail(){
    return function(dispatch, getState){
        dispatch(setEditDetail());
        dispatch(setFormType(getState().activeDetail.type))
        dispatch(setBottomPanelView(views.CREATE));
    }
}