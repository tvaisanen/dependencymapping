import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function resourceReducer(state = initialState.resources, action){
    switch(action.type) {
        case types.LOAD_RESOURCES_SUCCESS:
            console.debug('LOAD_RESOURCES_SUCCESS');
            console.debug(action);
            return action.resources;
        
        case types.LOAD_RESOURCE_SUCCESS:
            console.debug('LOAD_RESOURCE_SUCCESS');
            console.debug(action);
            return action.resources;

        case types.ADD_RESOURCE:
            console.debug("added resource");
            console.debug(action.resource);
            return [...state, action.resource]

        default:
            return state;
    }
}