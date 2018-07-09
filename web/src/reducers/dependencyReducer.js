import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function dependencyReducer(state = initialState.dependencies, action){
    switch(action.type) {
        case types.LOAD_DEPENDENCIES_SUCCESS:
            console.debug('LOAD_DEPENDENCIES_SUCCESS');
            console.debug(action);
            return action.dependencies;
        default:
            return state;
    }
}