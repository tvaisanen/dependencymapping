import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function categoryReducer(state = initialState.categories, action){
    switch(action.type) {
        case types.LOAD_CATEGORIES_SUCCESS:
            console.debug('LOAD_CATEGORIES_SUCCESS');
            console.debug(action);
            return action.categories;
        default:
            return state;
    }
}