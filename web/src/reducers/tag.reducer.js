import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function categoryReducer(state = initialState.tags, action) {
    switch (action.type) {

        case types.LOAD_CATEGORIES_SUCCESS:
            return action.tags;

        case types.ADD_TAG:
            return [action.tag, ...state];

        case types.UPDATE_TAG_SUCCESS:
            const removeUpdated = state.filter(t => t.name !== action.tag.name);
            return [...removeUpdated, action.tag];

        case types.DELETE_TAG_SUCCESS:
            const filtered = state.filter(t => t.name !== action.removed);
            return filtered;
        default:
            return state;
    }
}