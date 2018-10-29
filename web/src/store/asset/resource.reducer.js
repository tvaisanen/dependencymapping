import * as types from './asset.action-types';
import initialState from '../../reducers/initialState';

export default function resourceReducer(state = initialState.resources, action) {
    switch (action.type) {
        case types.LOAD_RESOURCES_SUCCESS:
            return [...action.resources];

        case types.LOAD_RESOURCE_SUCCESS:
            return action.resources;

        case types.POST_RESOURCE_SUCCESS:
            return [action.resource, ...state];

        case types.ADD_RESOURCE:
            return [action.resource, ...state];

        case types.UPDATE_RESOURCE_SUCCESS:
            const removeUpdated = state.filter(m => m.name !== action.resource.name);
            return [...removeUpdated, action.resource];

        case types.DELETE_RESOURCE_SUCCESS:
            return state.filter(m => m.name !== action.removed);
        default:
            return state;
    }
}