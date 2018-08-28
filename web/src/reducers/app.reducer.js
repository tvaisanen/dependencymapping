import initialState from './initialState';
import * as types from '../actions/actionTypes';
import * as resourceType from '../constants/types';

export default function ( state = initialState.app, action ){
    switch(action.type){
        case types.SET_FORM_TYPE:
            return {
                bottomPanel: state.bottomPanel,
                form: {
                    ...state.form,
                    type: action.formType
                }
            };
        case types.SET_BOTTOM_PANEL_VIEW:
            return {
                ...state,
                bottomPanel: {
                    ...state.bottomPanel,
                    view: action.view
                }};

        case types.SET_EDIT_DETAIL:
            return {
                ...state,
                form: {
                    ...state.form,
                    edit: true,
                }
            };

        case types.CANCEL_EDIT:
            return {
                ...state,
                form: {
                    edit: false,
                    type: resourceType.ASSET
                }
            };

        default:
            return state;
    }
}