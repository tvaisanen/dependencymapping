import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function resourceReducer(state = initialState.resources, action) {
    switch (action.type) {
        case types.LOAD_RESOURCES_SUCCESS:
            console.debug('LOAD_RESOURCES_SUCCESS');
            return action.resources;

        case types.LOAD_RESOURCE_SUCCESS:
            console.debug('LOAD_RESOURCE_SUCCESS');
            return action.resources;

        case types.POST_RESOURCE_SUCCESS:
            return [...state, action.resource];

        case types.ADD_RESOURCE:
            console.debug("added resource");
            return [...state, action.resource];

        case types.UPDATE_RESOURCE_SUCCESS:
            console.info("reducer actionUpdate mapping success");
            const removeUpdated = state.filter(m => m.name !== action.resource.name);

            return [...removeUpdated, action.resource];
            break;

        case types.DELETE_RESOURCE_SUCCESS:
            const filtered = state.filter(m => m.name !== action.removed);
            return filtered;
        default:
            return state;
    }
}