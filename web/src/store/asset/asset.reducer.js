import * as types from './asset.action-types';
import initialState from '../../reducers/initialState';

export default function resourceReducer(state = initialState.resources, action) {
    switch (action.type) {
        case types.LOAD_ASSETS_SUCCESS:
            return [...action.assets];

        case types.LOAD_ASSET_SUCCESS:
            return action.asset;

        case types.POST_ASSET_SUCCESS:
            return [action.asset, ...state];

        case types.ADD_ASSET:
            return [action.asset, ...state];

        case types.UPDATE_ASSET_SUCCESS:
            const removeUpdated = state.filter(m => m.name !== action.asset.name);
            return [...removeUpdated, action.asset];

        case types.DELETE_ASSET_SUCCESS:
            return state.filter(m => m.name !== action.removed);
        default:
            return state;
    }
}