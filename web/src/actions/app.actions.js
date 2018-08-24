import * as types from './actionTypes';
import * as views from '../constants/views';

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

export function cancelEdit(){
    return function(dispatch, getState) {
        dispatch(setEditFalse());
        dispatch(setBottomPanelView(views.BROWSE))
    }
}

export function editDetail(){
    return function(dispatch, getState){
        dispatch(setEditDetail());
        dispatch(setFormType(getState().activeDetail.type))
        dispatch(setBottomPanelView(views.CREATE));
    }
}