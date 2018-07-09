import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function categoryReducer(state = initialState.categories, action){
    switch(action.type) {
        case types.LOAD_CATEGORIES_SUCCESS:
            console.debug('LOAD_CATEGORIES_SUCCESS');
            console.debug(action);
            return action.categories;
        case types.ADD_TAG:
            console.info("tag reducer");
            console.info(action);
            console.info(state);
            console.info([action.tag, ...state]);
            return [ action.tag, ...state ];
        default:
            return state;
    }
}