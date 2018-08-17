import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function categoryReducer(state = initialState.activeDetail, action) {
    switch (action.type) {
        case types.SET_ACTIVE_DETAIL:
            return action.activeDetail;

        default:
            return state;
    }
}