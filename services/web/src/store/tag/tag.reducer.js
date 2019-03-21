import * as types from './tag.action-types';
import initialState from '../initialState';

export default function tagReducer(state = initialState.tags, action) {
    switch (action.type) {

        case types.LOAD_TAGS_SUCCESS:
            return action.tags;

        case types.POST_TAG_SUCCESS:
            return [action.tag, ...state];

        case types.UPDATE_TAG_SUCCESS:
            const removeUpdated = state.filter(t => t.name !== action.tag.name);
            return [...removeUpdated, action.tag];

        case types.DELETE_TAG_SUCCESS:
            return state.filter(t => t.name !== action.tagName);
        default:
            return state;
    }
}